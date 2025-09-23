import express from 'express'
import { createProgramElement, deleteProgramElement, getProgramElement, updateProgramElement, validateProgramElement } from '../controllers/programElementController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/:id', authenticate, getProgramElement)
router.post('/', authenticate, createProgramElement)
router.put('/:id', authenticate, updateProgramElement)
router.put('/:id/validate', authenticate, validateProgramElement)
router.delete('/:id', authenticate, deleteProgramElement)

export default router
