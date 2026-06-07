import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const BUCKET = 'site-images'

// Extract { bucket, path } from a Supabase Storage public URL
function parseStorageUrl(url: string): { bucket: string; path: string } | null {
  const match = url.match(/\/storage\/v1\/object\/public\/([^/?#]+)\/(.+)/)
  return match ? { bucket: match[1], path: match[2] } : null
}

async function ensureBucket(name: string) {
  await supabaseAdmin.storage.createBucket(name, { public: true }).catch(() => {})
}

async function deleteOldImage(deleteUrl: string) {
  const parsed = parseStorageUrl(deleteUrl)
  if (!parsed) return
  await supabaseAdmin.storage.from(parsed.bucket).remove([parsed.path]).catch(() => {})
}

export async function POST(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET
  const auth = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!secret || auth !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await ensureBucket(BUCKET)

  const formData = await req.formData()
  const deleteUrl = formData.get('deleteUrl') as string | null
  const file = formData.get('file') as File | null
  const importUrl = formData.get('importUrl') as string | null

  let uploadBuffer: ArrayBuffer
  let contentType: string
  let filename: string

  if (file) {
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 })
    }
    uploadBuffer = await file.arrayBuffer()
    contentType = file.type
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  } else if (importUrl) {
    let imgRes: Response
    try {
      imgRes = await fetch(importUrl, { signal: AbortSignal.timeout(20000) })
    } catch {
      return NextResponse.json({ error: 'Could not fetch the image URL' }, { status: 400 })
    }
    if (!imgRes.ok) {
      return NextResponse.json({ error: `Image URL returned ${imgRes.status}` }, { status: 400 })
    }
    contentType = imgRes.headers.get('content-type') ?? 'image/jpeg'
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'URL does not point to an image' }, { status: 400 })
    }
    uploadBuffer = await imgRes.arrayBuffer()
    const ext = contentType.split('/')[1]?.split(';')[0]?.replace('jpeg', 'jpg') ?? 'jpg'
    filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  } else {
    return NextResponse.json({ error: 'Provide a file or importUrl' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(filename, uploadBuffer, { contentType, upsert: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Delete old image only after successful upload
  if (deleteUrl) await deleteOldImage(deleteUrl)

  const { data: { publicUrl } } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filename)
  return NextResponse.json({ url: publicUrl })
}
