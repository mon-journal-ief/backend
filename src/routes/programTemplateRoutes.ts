import express from 'express'
import { getAllProgramTemplates, getProgramTemplate, createProgramTemplate, updateProgramTemplate, deleteProgramTemplate } from '../controllers/programTemplateController'
import { authenticate, requireAdmin } from '../middleware/auth'

const router = express.Router()

router.get('/', authenticate, getAllProgramTemplates)
router.get('/:id', authenticate, getProgramTemplate)
router.post('/', authenticate, requireAdmin, createProgramTemplate)
router.put('/:id', authenticate, requireAdmin, updateProgramTemplate)
router.delete('/:id', authenticate, requireAdmin, deleteProgramTemplate)

export default router