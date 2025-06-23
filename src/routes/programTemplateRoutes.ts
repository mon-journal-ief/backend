import express from 'express'
import { getAllProgramTemplates, getProgramTemplate, createProgramTemplate, updateProgramTemplate, deleteProgramTemplate } from '../controllers/programTemplateController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/', authenticate, getAllProgramTemplates)
router.get('/:id', authenticate, getProgramTemplate)
router.post('/', authenticate, createProgramTemplate)
router.put('/:id', authenticate, updateProgramTemplate)
router.delete('/:id', authenticate, deleteProgramTemplate)

export default router