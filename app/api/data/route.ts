import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')
const ADMIN_PASSWORD = 'admin123'

interface DBData {
  content: Record<string, unknown>
  courses: Record<string, unknown>
  contacts: Record<string, unknown>
  images: Record<string, unknown>
  blog: unknown[]
  faq: unknown[]
  reviews: unknown[]
  applications: unknown[]
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

// GET - Public access to all data
export async function GET() {
  try {
    const data = await readDB()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 })
  }
}

// PUT - Admin only: Update content, courses, contacts, images
export async function PUT(request: Request) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const db = await readDB()
    
    // Merge updates into database
    const updatedDB: DBData = {
      ...db,
      content: body.content ? { ...db.content, ...body.content } : db.content,
      courses: body.courses ? { ...db.courses, ...body.courses } : db.courses,
      contacts: body.contacts ? { ...db.contacts, ...body.contacts } : db.contacts,
      images: body.images ? { ...db.images, ...body.images } : db.images,
      blog: body.blog ?? db.blog,
      faq: body.faq ?? db.faq,
      reviews: body.reviews ?? db.reviews,
      applications: body.applications ?? db.applications,
    }

    await writeDB(updatedDB)
    return NextResponse.json({ success: true, data: updatedDB })
  } catch (error) {
    console.error('Error updating database:', error)
    return NextResponse.json({ error: 'Failed to update database' }, { status: 500 })
  }
}
