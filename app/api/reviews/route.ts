import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')
const ADMIN_PASSWORD = 'admin123'

interface Review {
  id: number
  name: string
  text: string
  rating: number
  course: string
  image?: string
  date: string
  approved: boolean
}

interface DBData {
  reviews: Review[]
  [key: string]: unknown
}

async function readDB(): Promise<DBData> {
  const data = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

async function writeDB(data: DBData) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

function verifyPassword(request: Request): boolean {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  const password = authHeader.substring(7)
  return password === ADMIN_PASSWORD
}

// GET - Public: Get approved reviews only
export async function GET(request: Request) {
  try {
    const db = await readDB()
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'
    
    // If admin requests all reviews
    if (all && verifyPassword(request)) {
      return NextResponse.json(db.reviews)
    }
    
    // Public: only approved reviews
    const approvedReviews = db.reviews.filter((r: Review) => r.approved)
    return NextResponse.json(approvedReviews)
  } catch (error) {
    console.error('Error reading reviews:', error)
    return NextResponse.json({ error: 'Failed to read reviews' }, { status: 500 })
  }
}

// POST - Public: Add new review (needs approval)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await readDB()
    
    // Validate required fields
    if (!body.name || !body.text || !body.rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const newReview: Review = {
      id: Date.now(),
      name: body.name.trim(),
      text: body.text.trim(),
      rating: Math.min(5, Math.max(1, Number(body.rating))),
      course: body.course || 'general',
      image: body.image || '',
      date: new Date().toISOString().split('T')[0],
      approved: false, // Reviews need admin approval
    }
    
    db.reviews.push(newReview)
    await writeDB(db)
    
    return NextResponse.json({ success: true, review: newReview })
  } catch (error) {
    console.error('Error adding review:', error)
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 })
  }
}

// PUT - Admin only: Update review (approve, edit, etc.)
export async function PUT(request: Request) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const db = await readDB()
    
    const reviewIndex = db.reviews.findIndex((r: Review) => r.id === body.id)
    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    
    db.reviews[reviewIndex] = { ...db.reviews[reviewIndex], ...body }
    await writeDB(db)
    
    return NextResponse.json({ success: true, review: db.reviews[reviewIndex] })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

// DELETE - Admin only: Delete review
export async function DELETE(request: Request) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get('id'))
    
    if (!id) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 })
    }
    
    const db = await readDB()
    const reviewIndex = db.reviews.findIndex((r: Review) => r.id === id)
    
    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
    
    db.reviews.splice(reviewIndex, 1)
    await writeDB(db)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
