import { put, del, list } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = 'admin123'

function verifyPassword(request: Request): boolean {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  const password = authHeader.substring(7)
  return password === ADMIN_PASSWORD
}

// Upload image (admin only)
export async function POST(request: NextRequest) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'gallery'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `nailmaster/${folder}/${timestamp}.${ext}`

    const blob = await put(filename, file, {
      access: 'public',
    })

    return NextResponse.json({ 
      url: blob.url,
      pathname: blob.pathname 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

// Delete image (admin only)
export async function DELETE(request: NextRequest) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    // Only delete Blob URLs
    if (url.includes('blob.vercel-storage.com') || url.includes('public.blob.vercel-storage.com')) {
      await del(url)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

// List images (admin only)
export async function GET(request: NextRequest) {
  try {
    if (!verifyPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { blobs } = await list()

    return NextResponse.json({
      files: blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        filename: blob.pathname.split('/').pop() || 'unknown',
        uploadedAt: blob.uploadedAt,
      })),
    })
  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}
