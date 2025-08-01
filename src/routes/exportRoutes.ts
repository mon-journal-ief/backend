import express from 'express'
import { exportJournalEntriesToPDF } from '../controllers/exportController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Export journal entries to PDF for a child
router.get('/pdf/:childId', authenticate, exportJournalEntriesToPDF)

export default router