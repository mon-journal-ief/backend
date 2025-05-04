import express from 'express'
import { register, login, getCurrentUser } from '../controllers/authController'
import { authenticate } from '../middleware/auth'
import { check } from 'express-validator'

const router = express.Router()

// Get current user
router.get('/me', authenticate, getCurrentUser)

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login 
)

// Register user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
)

export default router