import express from 'express'
import { getAllProgramElements, getProgramElement, createProgramElement, updateProgramElement, deleteProgramElement } from '../controllers/programElementController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/', authenticate, getAllProgramElements)
router.get('/:id', authenticate, getProgramElement)
router.post('/', authenticate, createProgramElement)
router.put('/:id', authenticate, updateProgramElement)
router.delete('/:id', authenticate, deleteProgramElement)

export default router 