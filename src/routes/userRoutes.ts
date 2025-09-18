import { Router } from 'express'
import { body } from 'express-validator'
import { authenticate } from '../middleware/auth'
import { updateUserPreferences } from '../controllers/userController'
import { RateLimitService } from '../services/rateLimitService'

const router = Router()

// Update user preferences
router.patch(
  '/preferences',
  RateLimitService.userPreferences,
  [
    body('name')
      .optional()
      .isString()
      .withMessage('name must be a string'),
    body('aiSuggestionsEnabled')
      .optional()
      .isBoolean()
      .withMessage('aiSuggestionsEnabled must be a boolean'),
    body('aiOnboardingShown')
      .optional()
      .isBoolean()
      .withMessage('aiOnboardingShown must be a boolean'),
  ],
  authenticate,
  updateUserPreferences
)

export default router
