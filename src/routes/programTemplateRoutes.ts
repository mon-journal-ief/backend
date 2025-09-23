import express from 'express'
import { copyProgramTemplate, getAllProgramTemplates } from '../controllers/programTemplateController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/', authenticate, getAllProgramTemplates)
router.post('/copy', authenticate, copyProgramTemplate)

export default router
