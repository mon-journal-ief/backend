import { Request, Response } from 'express'
import { handleMulterUpload, UploadService } from '../services/uploadService'
import prisma from '../config/db'
import { getImageUrl } from '../services/scalewayStorageService'

export async function uploadJournalEntryImage(req: Request, res: Response): Promise<void> {
  try {
    const file = await handleMulterUpload(req, res, 'image')
    const uploadResult = await UploadService.uploadImage(file)
    
    // Add image to journal entry (assuming journalEntryId is passed in request body)
    const { journalEntryId, childId } = req.body
    if (journalEntryId) {
      // Verify the journal entry belongs to the authenticated user
      const journalEntry = await prisma.journalEntry.findUnique({
        where: { id: journalEntryId },
        include: { child: { select: { id: true, userId: true } } }
      })

      if (!journalEntry || journalEntry.child.userId !== req.user.id) {
        res.status(404).json({ message: 'Journal entry not found' })
        return
      }

      // If a childId is provided, ensure it matches the journal entry's child
      if (childId && journalEntry.child.id !== childId) {
        res.status(400).json({ message: 'Invalid childId for provided journalEntryId' })
        return
      }

      await prisma.journalEntry.update({
        where: { id: journalEntryId },
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
      // Compute image URL and verify ownership before deleting from storage
      const imageUrl = getImageUrl(filename)

      // Find only the current user's journal entries that reference this image
      const journalEntries = await prisma.journalEntry.findMany({
        where: {
          images: { has: imageUrl },
          child: { userId: req.user.id }
        },
        select: { id: true, images: true }
      })

      if (journalEntries.length === 0) {
        res.status(404).json({ message: 'Journal entry image not found' })
        return
      }

      // Delete image using common service (after ownership verification)
      await UploadService.deleteImage(filename)

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

