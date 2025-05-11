import express from 'express'
import { getAllPrograms, getProgram, createProgram, updateProgram, deleteProgram } from '../controllers/programController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/', authenticate, getAllPrograms)
router.get('/:id', authenticate, getProgram)
router.post('/', authenticate, createProgram)
router.put('/:id', authenticate, updateProgram)
router.delete('/:id', authenticate, deleteProgram)

export default router