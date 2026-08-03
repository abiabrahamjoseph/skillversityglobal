import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const query = searchParams.get('query')?.toLowerCase()

    const payload = await getPayload({ config: configPromise })

    const mediaDocs = await payload.find({
      collection: 'media',
      limit: 100,
      sort: '-createdAt',
      depth: 1,
    })

    let results = mediaDocs.docs.map((doc: any) => ({
      id: doc.id,
      filename: doc.filename,
      url: doc.url || `/media/${doc.filename}`,
      alt: doc.alt || doc.filename,
      mimeType: doc.mimeType,
      filesize: doc.filesize,
      width: doc.width,
      height: doc.height,
      createdAt: doc.createdAt,
    }))

    if (query) {
      results = results.filter(
        (m: any) =>
          m.filename?.toLowerCase().includes(query) ||
          m.alt?.toLowerCase().includes(query)
      )
    }

    return NextResponse.json({ success: true, count: results.length, media: results })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch media' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const altText = (formData.get('alt') as string) || 'Skillversity Uploaded Media'
    const category = (formData.get('category') as string) || 'general'

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Try Payload CMS Media collection upload first
    try {
      const payload = await getPayload({ config: configPromise })
      const uploadedMedia = await payload.create({
        collection: 'media',
        data: {
          alt: altText || file.name,
        },
        file: {
          data: buffer,
          name: file.name,
          mimetype: file.type || 'image/png',
          size: file.size,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Image uploaded successfully!',
        media: {
          id: uploadedMedia.id,
          filename: uploadedMedia.filename,
          url: uploadedMedia.url || `/media/${uploadedMedia.filename}`,
          alt: uploadedMedia.alt,
          filesize: uploadedMedia.filesize,
          mimeType: uploadedMedia.mimeType,
        },
      })
    } catch (payloadErr: any) {
      // Fallback: Save directly to public/media folder if Payload DB context is unavailable
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const targetDir = process.env.VERCEL
        ? '/tmp/media'
        : path.resolve(process.cwd(), 'public/media')

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }

      const filePath = path.join(targetDir, sanitizedFilename)
      fs.writeFileSync(filePath, buffer)

      const publicUrl = `/media/${sanitizedFilename}`

      return NextResponse.json({
        success: true,
        message: 'Image uploaded to local media folder!',
        media: {
          filename: sanitizedFilename,
          url: publicUrl,
          alt: altText,
          filesize: file.size,
          mimeType: file.type,
        },
      })
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Upload failed' },
      { status: 500 }
    )
  }
}
