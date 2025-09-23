import type { Request, Response } from 'express'
import prisma from '../config/db'
import { getImageUrl } from '../services/scalewayStorageService'
import { handleMulterUpload, UploadService } from '../services/uploadService'

export async function uploadProfileImage(req: Request, res: Response): Promise<void> {
  try {
    const file = await handleMulterUpload(req, res, 'image')
    const uploadResult = await UploadService.uploadImage(file)

    // Add image to child profile (assuming childId is passed in request body)
    const { childId } = req.body
    if (childId) {
      // Verify the child belongs to the authenticated user
      const child = await prisma.child.findFirst({
        where: { id: childId, userId: req.user.id },
        select: { id: true },
      })

      if (!child) {
        res.status(404).json({ message: 'Child not found' })

        return
      }

      await prisma.child.update({
        where: { id: childId },
        data: { profileImage: uploadResult.url },
      })
    }

    // Return success response specific to profile images
    res.status(201).json({
      message: 'Profile image uploaded successfully',
      data: {
        filename: uploadResult.filename,
        originalName: uploadResult.originalName,
        size: uploadResult.size,
        url: uploadResult.url,
        type: 'profile_image',
      },
    })
  }
  catch (error) {
    // Handle multer errors from service
    if (error && typeof error === 'object' && 'status' in error && 'response' in error) {
      res.status(error.status as number).json(error.response)

      return
    }

    // Handle processing errors
    console.error('Profile image upload error:', error)
    res.status(500).json({
      message: 'Error processing profile image',
      code: 'PROCESSING_ERROR',
    })
  }
}

export async function deleteProfileImage(req: Request, res: Response): Promise<void> {
  try {
    const { filename } = req.params

    try {
      // Compute URL and check ownership first
      const imageUrl = getImageUrl(filename)

      // Ensure at least one of the authenticated user's children uses this image
      const affectedChildren = await prisma.child.findMany({
        where: { profileImage: imageUrl, userId: req.user.id },
        select: { id: true },
      })

      if (affectedChildren.length === 0) {
        res.status(404).json({ message: 'Profile image not found' })

        return
      }

      // Delete from storage after ownership verification
      await UploadService.deleteImage(filename)

      // Remove image references from the current user's child profiles
      await prisma.child.updateMany({
        where: { profileImage: imageUrl, userId: req.user.id },
        data: { profileImage: null },
      })

      res.json({
        message: 'Profile image deleted successfully',
        filename,
        type: 'profile_image',
      })
    }
    catch (error) {
      console.error('Profile image delete error:', error)

      // Check if it's a storage-related error (image not found in Scaleway)
      if (error instanceof Error && error.message.includes('NoSuchKey')) {
        res.status(404).json({
          message: 'Profile image not found in storage',
          code: 'IMAGE_NOT_FOUND',
        })
      }
      else if (error instanceof Error && (error.message.includes('Invalid filename') || error.message.includes('Invalid filename format'))) {
        res.status(400).json({
          message: error.message,
          code: 'INVALID_FILENAME',
        })
      }
      else {
        res.status(500).json({
          message: 'Error deleting profile image',
          code: 'DELETE_ERROR',
        })
      }
    }
  }
  catch (error) {
    console.error('Profile image delete error:', error)
    res.status(500).json({
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    })
  }
}
