import express from 'express'
import { check } from 'express-validator'
import { confirmPasswordReset, getCurrentUser, login, logout, refreshToken, register, requestPasswordReset, resendEmailVerification, verifyEmail } from '../controllers/authController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// Get current user
router.get('/me', authenticate, getCurrentUser)

// Logout user
router.post('/logout', authenticate, logout)

// Refresh token
router.post('/refresh', [
  check('refreshToken', 'Refresh token is required').notEmpty(),
], refreshToken)

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login,
)

// Register user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  register,
)

// Request password reset
router.post(
  '/request-password-reset',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  requestPasswordReset,
)

// Confirm password reset
router.post(
  '/confirm-password-reset',
  [
    check('token', 'Reset token is required').notEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  confirmPasswordReset,
)

// Verify email address
router.post(
  '/verify-email',
  [
    check('token', 'Verification token is required').notEmpty(),
  ],
  verifyEmail,
)

// Resend email verification
router.post(
  '/resend-verification',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  resendEmailVerification,
)

export default router
