import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')
const ADMIN_PASSWORD = 'admin123'

interface Application {
  id: number
  name: string
  contact: string
  course: string
  date: string
  status: 'new' | 'contacted' | 'enrolled' | 'rejected'
}

interface DBData {
  applications: Application[]
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

// GET - Admin only: Get all applications
export async function GET(request: Request) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const db = await readDB()
    return NextResponse.json(db.applications || [])
  } catch (error) {
    console.error('Error reading applications:', error)
    return NextResponse.json({ error: 'Failed to read applications' }, { status: 500 })
  }
}

// POST - Public: Submit new application
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await readDB()
    
    // Validate required fields
    if (!body.name || !body.contact) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const newApplication: Application = {
      id: Date.now(),
      name: body.name.trim(),
      contact: body.contact.trim(),
      course: body.course || 'not_specified',
      date: new Date().toISOString().split('T')[0],
      status: 'new',
    }
    
    if (!db.applications) {
      db.applications = []
    }
    db.applications.push(newApplication)
    await writeDB(db)
    
    return NextResponse.json({ success: true, application: newApplication })
  } catch (error) {
    console.error('Error adding application:', error)
    return NextResponse.json({ error: 'Failed to add application' }, { status: 500 })
  }
}

// PUT - Admin only: Update application status
export async function PUT(request: Request) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const db = await readDB()
    
    if (!db.applications) {
      db.applications = []
    }
    
    const appIndex = db.applications.findIndex((a: Application) => a.id === body.id)
    if (appIndex === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }
    
    db.applications[appIndex] = { ...db.applications[appIndex], ...body }
    await writeDB(db)
    
    return NextResponse.json({ success: true, application: db.applications[appIndex] })
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}

// DELETE - Admin only: Delete application
export async function DELETE(request: Request) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get('id'))
    
    if (!id) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }
    
    const db = await readDB()
    
    if (!db.applications) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }
    
    const appIndex = db.applications.findIndex((a: Application) => a.id === id)
    
    if (appIndex === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }
    
    db.applications.splice(appIndex, 1)
    await writeDB(db)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 })
  }
}
