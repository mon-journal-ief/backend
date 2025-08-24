import express from 'express'
import {
  getJournalEntries,
  getJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from '../controllers/journalEntryController'
import { authenticate } from '../middleware/auth'
import { check } from 'express-validator'

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

export default router 