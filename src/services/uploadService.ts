import multer from 'multer'
import sharp from 'sharp'
import { lookup } from 'mime-types'
import crypto from 'crypto'
import sanitize from 'sanitize-filename'
import { Request, Response } from 'express'
import { uploadToScaleway, deleteFromScaleway, getImageUrl } from './scalewayStorageService'

// Security configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB - reasonable for A4 print quality
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp'
]

// Generate secure filename with sanitization
function generateSecureFilename(originalName: string): string {
  // First sanitize the original filename
  const sanitizedName = sanitize(originalName, { replacement: '_' })
  
  // Extract extension from sanitized name
  const lastDotIndex = sanitizedName.lastIndexOf('.')
  const ext = lastDotIndex > 0 ? sanitizedName.substring(lastDotIndex).toLowerCase() : ''
  
  // Generate secure filename with timestamp and random bytes
  const timestamp = Date.now()
  const randomBytes = crypto.randomBytes(8).toString('hex') // Shorter for readability
  
  // Get base name without extension for reference
  const baseName = lastDotIndex > 0 ? sanitizedName.substring(0, lastDotIndex) : sanitizedName
  const truncatedBaseName = baseName.substring(0, 50) // Limit length
  
  // Combine: timestamp-random-originalname.ext
  return `${timestamp}-${randomBytes}-${truncatedBaseName}${ext}`
}

// Validate file type using multiple methods
function validateFileType(file: Express.Multer.File): boolean {
  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return false
  }
  
  // Double-check with file extension
  const lastDotIndex = file.originalname.lastIndexOf('.')
  const ext = lastDotIndex > 0 ? file.originalname.substring(lastDotIndex).toLowerCase() : ''
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  if (!allowedExtensions.includes(ext)) {
    return false
  }
  
  // Verify MIME type matches file content
  const detectedMimeType = lookup(file.originalname)
  if (detectedMimeType && !ALLOWED_MIME_TYPES.includes(detectedMimeType)) {
    return false
  }
  
  return true
}

// Validate image content using sharp (additional security layer)
async function validateImageContent(buffer: Buffer): Promise<boolean> {
  try {
    const metadata = await sharp(buffer).metadata()
    
    // Check if it's actually an image
    if (!metadata.format || !['jpeg', 'png', 'webp'].includes(metadata.format)) {
      return false
    }
    
    // Check reasonable dimensions (prevent extremely large images)
    if (metadata.width && metadata.height) {
      if (metadata.width > 10000 || metadata.height > 10000) {
        return false
      }
    }
    
    return true
  } catch {
    return false
  }
}

// Process and optimize image for A4 print quality
async function processImage(buffer: Buffer, filename: string): Promise<{ filename: string, url: string, size: number }> {
  // Process image with sharp for optimization
  // A4 at 300 DPI = ~2480x3508 pixels (portrait)
  // We'll limit to reasonable dimensions for web display while maintaining print quality
  const processedBuffer = await sharp(buffer)
    .resize(2000, 2000, { 
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ 
      quality: 85,
      progressive: true,
      mozjpeg: true
    })
    .toBuffer()

  const contentType = 'image/jpeg' // We're converting everything to JPEG

  // Upload to Scaleway Object Storage
  return await uploadToScaleway(processedBuffer, filename, contentType)
}

export const upload = multer({
  storage: multer.memoryStorage(), // Store in memory for processing
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 5,
    fields: 5,
    fieldNameSize: 100,
    fieldSize: 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    // Validate file type
    if (!validateFileType(file)) {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'))
      return
    }
    
    // Basic filename length validation
    if (file.originalname.length > 255) {
      cb(new Error('Filename too long'))
      return
    }
    
    // Check if filename can be sanitized (not empty after sanitization)
    const sanitizedName = sanitize(file.originalname, { replacement: '_' })
    if (!sanitizedName || sanitizedName.trim() === '') {
      cb(new Error('Invalid filename'))
      return
    }
    
    cb(null, true)
  }
})

export function handleMulterUpload(req: Request, res: Response, fieldName: string = 'image'): Promise<Express.Multer.File> {
  return new Promise((resolve, reject) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            reject({
              status: 400,
              response: { 
                message: 'File too large. Maximum size is 10MB',
                code: 'FILE_TOO_LARGE'
              }
            })
            return
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            reject({
              status: 400,
              response: { 
                message: 'Unexpected field name. Use "image" as the field name',
                code: 'INVALID_FIELD_NAME'
              }
            })
            return
          }
        }
        
        reject({
          status: 400,
          response: { 
            message: err.message || 'File upload error',
            code: 'UPLOAD_ERROR'
          }
        })
        return
      }
      
      if (!req.file) {
        reject({
          status: 400,
          response: { 
            message: 'No file uploaded',
            code: 'NO_FILE'
          }
        })
        return
      }
      
      resolve(req.file)
    })
  })
}

export class UploadService {
  static async uploadImage(file: Express.Multer.File): Promise<{ filename: string, url: string, size: number, originalName: string }> {
    // Additional content validation
    const isValidImage = await validateImageContent(file.buffer)
    if (!isValidImage) {
      throw new Error('Invalid image content')
    }
    
    // Generate secure filename
    const secureFilename = generateSecureFilename(file.originalname)
    
    // Process and save image
    const uploadResult = await processImage(file.buffer, secureFilename)
    
    return {
      ...uploadResult,
      originalName: file.originalname
    }
  }

  static async deleteImage(filename: string): Promise<string> {
    // Validate filename
    if (!filename || typeof filename !== 'string') {
      throw new Error('Invalid filename')
    }
    
    // Sanitize filename to prevent path traversal and other issues
    const sanitizedFilename = sanitize(filename, { replacement: '' })
    if (!sanitizedFilename || sanitizedFilename !== filename) {
      throw new Error('Invalid filename format')
    }
    
    // Get the image URL before deletion
    const imageUrl = getImageUrl(filename)
    
    // Delete from Scaleway Object Storage
    await deleteFromScaleway(filename)
    
    return imageUrl
  }
}
