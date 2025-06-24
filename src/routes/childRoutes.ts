import express from 'express'
import { getChildren, getChildById, createChild, updateChild, deleteChild } from '../controllers/childController'
import { authenticate } from '../middleware/auth'
import { check } from 'express-validator'

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
  createChild
)

// Update a child
router.put(
  '/:id',
  check('name', 'Nom obligatoire').optional().not().isEmpty(),
  authenticate,
  updateChild
)

// Delete a child
router.delete('/:id', authenticate, deleteChild)

export default router 