import express from 'express'
import { check } from 'express-validator'
import { createChild, deleteChild, getChildById, getChildren, updateChild } from '../controllers/childController'
import { deleteProfileImage, uploadProfileImage } from '../controllers/childImageController'
import { authenticate } from '../middleware/auth'
import { RateLimitService } from '../services/rateLimitService'

const router = express.Router()

// Get all children for the authenticated user
router.get('/', authenticate, getChildren)

// Get a specific child by ID
router.get('/:id', authenticate, getChildById)

// Create a new child
router.post(
  '/',
  check('name', 'Nom obligatoire').not().isEmpty(),
  authenticate,
  createChild,
)

// Update a child
router.put(
  '/:id',
  check('name', 'Nom obligatoire').optional().not().isEmpty(),
  authenticate,
  updateChild,
)

// Delete a child
router.delete('/:id', authenticate, deleteChild)

// Upload a profile image for a child
router.post('/profile-images', RateLimitService.profileImageUpload, authenticate, uploadProfileImage)

// Delete a profile image
router.delete('/profile-images/:filename', RateLimitService.profileImageDelete, authenticate, deleteProfileImage)

export default router
