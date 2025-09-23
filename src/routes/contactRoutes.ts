import express from 'express'
import { check } from 'express-validator'
import { sendContactMessage } from '../controllers/contactController'
import { optionalAuthenticate } from '../middleware/auth'
import { RateLimitService } from '../services/rateLimitService'

const router = express.Router()

// Send contact message
router.post(
  '/',
  RateLimitService.contactForm,
  [
    check('subject')
      .notEmpty()
      .withMessage('Le sujet est requis'),
    check('message')
      .notEmpty()
      .withMessage('Le message est requis'),
    check('email')
      .optional()
      .isEmail()
      .withMessage('L\'email doit être valide'),
  ],
  optionalAuthenticate,
  sendContactMessage,
)

export default router
