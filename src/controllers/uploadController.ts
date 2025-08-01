import { Request, Response } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import { lookup } from 'mime-types'
import crypto from 'crypto'
import sanitize from 'sanitize-filename'

// Security configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB - reasonable for A4 print quality
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp'
]

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'images')

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR)
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
  }
}

// Generate secure filename with sanitization
function generateSecureFilename(originalName: string): string {
  // First sanitize the original filename
  const sanitizedName = sanitize(originalName, { replacement: '_' })
  
  // Extract extension from sanitized name
  const ext = path.extname(sanitizedName).toLowerCase()
  
  // Generate secure filename with timestamp and random bytes
  const timestamp = Date.now()
  const randomBytes = crypto.randomBytes(8).toString('hex') // Shorter for readability
  
  // Get base name without extension for reference
  const baseName = path.basename(sanitizedName, ext)
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
  const ext = path.extname(file.originalname).toLowerCase()
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

const upload = multer({
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

// Process and optimize image for A4 print quality
async function processImage(buffer: Buffer, filename: string): Promise<string> {
  await ensureUploadDir()
  
  const outputPath = path.join(UPLOAD_DIR, filename)
  
  // Process image with sharp for optimization
  // A4 at 300 DPI = ~2480x3508 pixels (portrait)
  // We'll limit to reasonable dimensions for web display while maintaining print quality
  await sharp(buffer)
    .resize(2000, 2000, { 
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ 
      quality: 85,
      progressive: true,
      mozjpeg: true
    })
    .toFile(outputPath)
  
  return filename
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

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Use multer middleware
    upload.single('image')(req, res, async (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ 
              message: 'File too large. Maximum size is 10MB',
              code: 'FILE_TOO_LARGE'
            })
            return
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            res.status(400).json({ 
              message: 'Unexpected field name. Use "image" as the field name',
              code: 'INVALID_FIELD_NAME'
            })
            return
          }
        }
        
        res.status(400).json({ 
          message: err.message || 'File upload error',
          code: 'UPLOAD_ERROR'
        })
        return
      }
      
      if (!req.file) {
        res.status(400).json({ 
          message: 'No file uploaded',
          code: 'NO_FILE'
        })
        return
      }
      
      try {
        // Additional content validation
        const isValidImage = await validateImageContent(req.file.buffer)
        if (!isValidImage) {
          res.status(400).json({ 
            message: 'Invalid image content',
            code: 'INVALID_IMAGE_CONTENT'
          })
          return
        }
        
        // Generate secure filename
        const secureFilename = generateSecureFilename(req.file.originalname)
        
        // Process and save image
        const savedFilename = await processImage(req.file.buffer, secureFilename)
        
        // Return success response
        res.status(201).json({
          message: 'Image uploaded successfully',
          data: {
            filename: savedFilename,
            originalName: req.file.originalname,
            size: req.file.size,
            url: `/uploads/images/${savedFilename}`
          }
        })
        
      } catch (processError) {
        console.error('Image processing error:', processError)
        res.status(500).json({ 
          message: 'Error processing image',
          code: 'PROCESSING_ERROR'
        })
      }
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ 
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    })
  }
}

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params
    
    // Validate filename
    if (!filename || typeof filename !== 'string') {
      res.status(400).json({ 
        message: 'Invalid filename',
        code: 'INVALID_FILENAME'
      })
      return
    }
    
    // Sanitize filename to prevent path traversal and other issues
    const sanitizedFilename = sanitize(filename, { replacement: '' })
    if (!sanitizedFilename || sanitizedFilename !== filename) {
      res.status(400).json({ 
        message: 'Invalid filename format',
        code: 'INVALID_FILENAME_FORMAT'
      })
      return
    }
    
    const filePath = path.join(UPLOAD_DIR, filename)
    
    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
      
      res.json({ 
        message: 'Image deleted successfully',
        filename 
      })
      
    } catch (error) {
      res.status(404).json({ 
        message: 'Image not found',
        code: 'IMAGE_NOT_FOUND'
      })
    }
    
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ 
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    })
  }
}
