import express from 'express'
import { check } from 'express-validator'
import {
  createJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  getSuggestion,
  updateJournalEntry,
} from '../controllers/journalEntryController'
import { deleteJournalEntryImage, rotateJournalEntryImage, uploadJournalEntryImage } from '../controllers/journalEntryImageController'
import { authenticate } from '../middleware/auth'
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
  createJournalEntry,
)

// Update a journal entry
router.put(
  '/:id',
  check('date', 'date is required').not().isEmpty(),
  check('comment', 'comment is required').not().isEmpty(),
  authenticate,
  updateJournalEntry,
)

// Delete a journal entry
router.delete('/:id', authenticate, deleteJournalEntry)

// Upload an image for a journal entry
router.post('/images', RateLimitService.journalEntryImageUpload, authenticate, uploadJournalEntryImage)

// Delete a journal entry image
router.delete('/images/:filename', RateLimitService.journalEntryImageDelete, authenticate, deleteJournalEntryImage)

// Rotate a journal entry image
router.patch('/images/:filename/rotate', authenticate, rotateJournalEntryImage)

// Get AI suggestions for journal entry
router.post(
  '/suggestion',
  RateLimitService.journalEntrySuggestion,
  check('childId', 'childId is required').not().isEmpty(),
  check('comment', 'comment is required').not().isEmpty(),
  authenticate,
  getSuggestion,
)

export default router
