import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(data)
}

async function writeDB(data: Record<string, unknown>) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const data = await readDB()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading database:', error)
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { password, ...updates } = body

    // Simple password check
    if (password !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await readDB()
    
    // Merge updates into database
    const updatedDB = {
      ...db,
      ...updates,
      content: { ...db.content, ...updates.content },
      courses: { ...db.courses, ...updates.courses },
      contacts: { ...db.contacts, ...updates.contacts },
      images: { ...db.images, ...updates.images },
    }

    await writeDB(updatedDB)
    return NextResponse.json({ success: true, data: updatedDB })
  } catch (error) {
    console.error('Error updating database:', error)
    return NextResponse.json({ error: 'Failed to update database' }, { status: 500 })
  }
}
