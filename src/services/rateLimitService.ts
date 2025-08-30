import rateLimit from 'express-rate-limit'

const defaultConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: {
    message: 'Too many attempts, please try again later',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
}

export class RateLimitService {
  static journalEntryImageUpload = rateLimit({
    ...defaultConfig,
    max: 100,
  })

  static journalEntryImageDelete = rateLimit({
    ...defaultConfig,
    max: 200,
  })

  static profileImageUpload = rateLimit({
    ...defaultConfig,
    max: 15,
  })

  static profileImageDelete = rateLimit({
    ...defaultConfig,
    max: 15,
  })

  static generalUpload = rateLimit({
    ...defaultConfig,
    max: 100,
  })

  static generalDelete = rateLimit({
    ...defaultConfig,
    max: 200,
  })
}

