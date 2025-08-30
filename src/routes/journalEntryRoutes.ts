import express from 'express'
import {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from '../controllers/journalEntryController'
import { uploadJournalEntryImage, deleteJournalEntryImage } from '../controllers/journalEntryImageController'
import { authenticate } from '../middleware/auth'
import { check } from 'express-validator'
import { RateLimitService } from '../services/rateLimitService'

const router = express.Router()

// Get all journal entries for a child
router.get('/child/:childId', authenticate, getJournalEntries)

// Get a specific journal entry by ID
router.get('/:id', authenticate, getJournalEntryById)

// Create a new journal entry
router.post(
  '/',
  check('childId', 'childId is required').not().isEmpty(),
  check('date', 'date is required').not().isEmpty(),
  check('comment', 'comment is required').not().isEmpty(),
  authenticate,
  createJournalEntry
)

// Update a journal entry
router.put(
  '/:id',
  check('date', 'date is required').not().isEmpty(),
  check('comment', 'comment is required').not().isEmpty(),
  authenticate,
  updateJournalEntry
)

// Delete a journal entry
router.delete('/:id', authenticate, deleteJournalEntry)

// Upload an image for a journal entry
router.post('/images', RateLimitService.journalEntryImageUpload, authenticate, uploadJournalEntryImage)

// Delete a journal entry image
router.delete('/images/:filename', RateLimitService.journalEntryImageDelete, authenticate, deleteJournalEntryImage)

export default router 