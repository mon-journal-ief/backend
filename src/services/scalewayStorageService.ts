import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Scaleway Object Storage configuration
const SCALEWAY_ENDPOINT = process.env.SCW_OBJECT_STORAGE_ENDPOINT
const SCALEWAY_REGION = process.env.SCW_OBJECT_STORAGE_REGION
const BUCKET_NAME = process.env.SCW_OBJECT_STORAGE_BUCKET_NAME

// Environment variables for credentials
const ACCESS_KEY_ID = process.env.SCW_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.SCW_SECRET_KEY

// Initialize S3 client for Scaleway
let s3Client: S3Client | null = null

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
  console.warn('⚠️ Scaleway credentials not found. Image uploads will fail.')
} else {
  s3Client = new S3Client({
    endpoint: SCALEWAY_ENDPOINT,
    region: SCALEWAY_REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
    forcePathStyle: false, // Scaleway supports virtual-hosted-style requests
  })
}

export interface UploadResult {
  filename: string
  url: string
  size: number
}

export async function uploadToScaleway(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<UploadResult> {
  if (!s3Client) throw new Error('Scaleway S3 client not initialized. Check your credentials.')

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `images/${filename}`,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000', // 1 year
      ACL: 'public-read',
    })

    await s3Client.send(command)

    const publicUrl = `${SCALEWAY_ENDPOINT}/${BUCKET_NAME}/images/${filename}`

    return {
      filename,
      url: publicUrl,
      size: buffer.length,
    }
  } catch (error) {
    console.error('❌ Error uploading to Scaleway:', error)
    throw new Error(`Failed to upload image to Scaleway: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function deleteFromScaleway(filename: string): Promise<void> {
  if (!s3Client) throw new Error('Scaleway S3 client not initialized. Check your credentials.')

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `images/${filename}`,
    })

    await s3Client.send(command)
  } catch (error) {
    console.error('❌ Error deleting from Scaleway:', error)
    throw new Error(`Failed to delete image from Scaleway: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function downloadFromScaleway(filename: string): Promise<Buffer> {
  if (!s3Client) throw new Error('Scaleway S3 client not initialized. Check your credentials.')

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `images/${filename}`,
    })

    const response = await s3Client.send(command)
    
    if (!response.Body) {
      throw new Error('No file content received')
    }

    // Convert the stream to buffer
    const chunks: Uint8Array[] = []
    const reader = response.Body.transformToWebStream().getReader()
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
    }

    return Buffer.concat(chunks)
  } catch (error) {
    console.error('❌ Error downloading from Scaleway:', error)
    throw new Error(`Failed to download image from Scaleway: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function isScalewayConfigured(): boolean {
  return !!s3Client
}

export function getImageUrl(filename: string): string {
  return `${SCALEWAY_ENDPOINT}/${BUCKET_NAME}/images/${filename}`
}
