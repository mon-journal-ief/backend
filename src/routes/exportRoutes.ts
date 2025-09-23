import express from 'express'
import { exportJournalEntriesToPDF, exportJournalEntriesToWord } from '../controllers/exportController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Export journal entries to PDF for a child
router.get('/pdf/:childId', authenticate, exportJournalEntriesToPDF)

// Export journal entries to Word for a child
router.get('/word/:childId', authenticate, exportJournalEntriesToWord)

export default router
