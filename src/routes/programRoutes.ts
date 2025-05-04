import express from 'express'
import { getAllPrograms, getProgram, createProgram, deleteProgram } from '../controllers/programController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/', getAllPrograms)
router.get('/:id', getProgram)
router.post('/', authenticate, createProgram)
router.delete('/:id', authenticate, deleteProgram)

export default router