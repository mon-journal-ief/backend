import express from 'express'
import { uploadImage, deleteImage } from '../controllers/uploadController'
import { authenticate } from '../middleware/auth'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Limit each IP to 10 upload requests per 15 minutes
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: 'Too many upload attempts, please try again later',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Limit each IP to 20 delete requests per 15 minutes
const deleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: 'Too many delete attempts, please try again later',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Upload image endpoint
router.post(
  '/image',
  uploadLimiter,
  authenticate,
  uploadImage
)

// Delete image endpoint
router.delete(
  '/image/:filename',
  deleteLimiter,
  authenticate,
  deleteImage
)

export default router