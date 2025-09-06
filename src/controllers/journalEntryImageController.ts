import { Request, Response } from 'express'
import { handleMulterUpload, UploadService } from '../services/uploadService'
import prisma from '../config/db'

export async function uploadJournalEntryImage(req: Request, res: Response): Promise<void> {
  try {
    const file = await handleMulterUpload(req, res, 'image')
    const uploadResult = await UploadService.uploadImage(file)
    
    // Add image to journal entry (assuming journalEntryId is passed in request body)
    const { journalEntryId } = req.body
    if (journalEntryId) {
      await prisma.journalEntry.update({
        where: {
          id: journalEntryId,
          childId: req.body.childId
        },
        data: {
          images: {
            push: uploadResult.url
          }
        }
      })
    }
    
    // Return success response specific to journal entries
    res.status(201).json({
      message: 'Journal entry image uploaded successfully',
      data: {
        filename: uploadResult.filename,
        originalName: uploadResult.originalName,
        size: uploadResult.size,
        url: uploadResult.url,
        type: 'journal_entry_image'
      }
    })
    
  } catch (error) {
    // Handle multer errors from service
    if (error && typeof error === 'object' && 'status' in error && 'response' in error) {
      res.status(error.status as number).json(error.response)
      return
    }
    
    // Handle processing errors
    console.error('Journal entry image upload error:', error)
    res.status(500).json({ 
      message: 'Error processing journal entry image',
      code: 'PROCESSING_ERROR'
    })
  }
}

export async function deleteJournalEntryImage(req: Request, res: Response): Promise<void> {
  try {
    const { filename } = req.params
    
    try {
      // Delete image using common service
      const imageUrl = await UploadService.deleteImage(filename)
      
      // Remove specific image reference from journal entries while preserving other images
      const journalEntries = await prisma.journalEntry.findMany({
        where: {
          images: {
            has: imageUrl
          }
        },
        select: {
          id: true,
          images: true
        }
      })

      // Update each journal entry to remove only the specific image
      for (const entry of journalEntries) {
        const updatedImages = entry.images.filter(img => img !== imageUrl)
        await prisma.journalEntry.update({
          where: { id: entry.id },
          data: {
            images: {
              set: updatedImages
            }
          }
        })
      }

      console.log('Journal entry image deleted successfully', journalEntries)
      
      res.json({ 
        message: 'Journal entry image deleted successfully',
        filename,
        type: 'journal_entry_image'
      })
      
    } catch (error) {
      console.error('Journal entry image delete error:', error)
      
      // Check if it's a storage-related error (image not found in Scaleway)
      if (error instanceof Error && error.message.includes('NoSuchKey')) {
        res.status(404).json({ 
          message: 'Journal entry image not found in storage',
          code: 'IMAGE_NOT_FOUND'
        })
      } else if (error instanceof Error && (error.message.includes('Invalid filename') || error.message.includes('Invalid filename format'))) {
        res.status(400).json({ 
          message: error.message,
          code: 'INVALID_FILENAME'
        })
      } else {
        res.status(500).json({ 
          message: 'Error deleting journal entry image',
          code: 'DELETE_ERROR'
        })
      }
    }
    
  } catch (error) {
    console.error('Journal entry image delete error:', error)
    res.status(500).json({ 
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    })
  }
}

