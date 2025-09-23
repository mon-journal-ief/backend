import type { Request, Response } from 'express'
import type { User } from '../../generated/prisma/client'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import prisma from '../config/db'
import emailService from '../services/emailService'

interface TokenResponse {
  accessToken: string
  refreshToken: string
}

interface AuthResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    requiresVerification?: boolean
    userId?: string
    email?: string
  }
}

function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex')
}

async function generateTokens(user: User): Promise<TokenResponse> {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken()

  // Store refresh token in database with 60 day expiration
  const refreshTokenExpiresAt = new Date()
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 60)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken,
      refreshTokenExpiresAt,
    },
  })

  return { accessToken, refreshToken }
}

function generateAccessToken(user: User): string {
  return jwt.sign({
    user: { id: user.id },
  }, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '10d',
  })
}

// Register user
export async function register(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const response: AuthResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: errors.array().map(error => error.msg).join(', '),
      },
    }
    res.json(response)

    return
  }

  const { email, password, name } = req.body

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      // Case 1: Account exists and is verified - do nothing (return existing error)
      if (user.emailVerified) {
        const response: AuthResponse = {
          success: false,
          error: {
            code: 'USER_EXISTS',
            message: 'Un compte avec cet email existe déjà. Si vous avez oublié votre mot de passe, vous pouvez le réinitialiser dans l\'onglet "Se connecter".',
          },
        }
        res.json(response)

        return
      }

      // Case 2: Account exists but is not verified - resend verification email
      // Generate new verification token
      const emailVerificationToken = crypto.randomBytes(32).toString('hex')
      const emailVerificationExpires = new Date()
      emailVerificationExpires.setHours(emailVerificationExpires.getHours() + 24) // 24 hour expiration

      // Update user with new token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerificationToken,
          emailVerificationExpires,
        },
      })

      // Send new verification email (don't block the response if email fails)
      emailService.sendEmailVerification(user.email, user.name, emailVerificationToken).catch((error) => {
        console.error('Failed to send verification email:', error)
      })

      const response: AuthResponse = {
        success: false,
        error: {
          code: 'USER_EXISTS_UNVERIFIED',
          message: 'Un compte avec cet email existe déjà mais n\'est pas encore vérifié. Un nouvel email de vérification a été envoyé.',
        },
      }
      res.json(response)

      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex')
    const emailVerificationExpires = new Date()
    emailVerificationExpires.setHours(emailVerificationExpires.getHours() + 24) // 24 hour expiration

    // Create user (not verified initially)
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerificationToken,
        emailVerificationExpires,
      },
    })

    // Send email verification (don't block the response if email fails)
    emailService.sendEmailVerification(user.email, user.name, emailVerificationToken).catch((error) => {
      console.error('Failed to send verification email:', error)
    })

    const response: AuthResponse = {
      success: true,
      data: {
        message: 'Compte créé avec succès. Veuillez vérifier votre email pour activer votre compte.',
        userId: user.id,
        email: user.email,
      },
    }
    res.json(response)
  }
  catch (err) {
    console.error(err)
    const response: AuthResponse = {
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Erreur serveur',
      },
    }
    res.json(response)
  }
}

// Login user
export async function login(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const response: AuthResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: errors.array().map(error => error.msg).join(', '),
      },
    }
    res.json(response)

    return
  }

  const { email, password } = req.body

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      const response: AuthResponse = {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Identifiants invalides',
        },
      }
      res.json(response)

      return
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const response: AuthResponse = {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Identifiants invalides',
        },
      }
      res.json(response)

      return
    }

    // Check if email is verified
    if (!user.emailVerified) {
      const response: AuthResponse = {
        success: false,
        error: {
          code: 'EMAIL_NOT_VERIFIED',
          message: 'Veuillez vérifier votre email avant de vous connecter.',
          requiresVerification: true,
          userId: user.id,
          email: user.email,
        },
      }
      res.json(response)

      return
    }

    // Generate tokens
    const tokens = await generateTokens(user)
    const response: AuthResponse<TokenResponse> = {
      success: true,
      data: tokens,
    }
    res.json(response)
  }
  catch (err) {
    console.error(err)
    const response: AuthResponse = {
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Erreur serveur',
      },
    }
    res.json(response)
  }
}

// Refresh token
export async function refreshToken(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body

  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token requis' })

    return
  }

  try {
    // Find user with this refresh token
    const user = await prisma.user.findFirst({
      where: {
        refreshToken,
        refreshTokenExpiresAt: {
          gt: new Date(), // Token must not be expired
        },
      },
    })

    if (!user) {
      res.status(401).json({ message: 'Refresh token invalide ou expiré' })

      return
    }

    // Generate new tokens
    const tokens = await generateTokens(user)
    res.json(tokens)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Logout user (invalidate refresh token)
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        refreshToken: null,
        refreshTokenExpiresAt: null,
      },
    })

    res.json({ message: 'Déconnexion réussie' })
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Get current user
export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        aiSuggestionsEnabled: true,
        aiOnboardingShown: true,
        children: {
          include: {
            program: true,
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    })

    res.json(user)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Request password reset
export async function requestPasswordReset(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })

    return
  }

  const { email } = req.body

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } })

    // Always return success to prevent email enumeration attacks
    if (!user) {
      res.json({ message: 'Si cette adresse email existe dans notre système, vous recevrez un lien de réinitialisation.' })

      return
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiresAt = new Date()
    resetTokenExpiresAt.setHours(resetTokenExpiresAt.getHours() + 1) // 1 hour expiration

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiresAt,
      },
    })

    // Send password reset email
    await emailService.sendPasswordResetEmail(user.email, user.name, resetToken)

    res.json({ message: 'Si cette adresse email existe dans notre système, vous recevrez un lien de réinitialisation.' })
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Confirm password reset
export async function confirmPasswordReset(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })

    return
  }

  const { token, password } = req.body

  try {
    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiresAt: {
          gt: new Date(), // Token must not be expired
        },
      },
    })

    if (!user) {
      res.status(400).json({ message: 'Token de réinitialisation invalide ou expiré' })

      return
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    })

    const response: AuthResponse = {
      success: true,
      data: {
        message: 'Mot de passe réinitialisé avec succès',
      },
    }
    res.json(response)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Verify email address
export async function verifyEmail(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })

    return
  }

  const { token } = req.body

  try {
    // Find user with valid verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    })

    if (!user) {
      const response: AuthResponse = {
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token de vérification invalide ou expiré',
        },
      }
      res.json(response)

      return
    }

    // Mark email as verified and clear verification token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    })

    // Generate tokens for immediate login
    const tokens = await generateTokens(user)
    const response: AuthResponse<TokenResponse & { message: string }> = {
      success: true,
      data: {
        message: 'Email vérifié avec succès ! Bienvenue sur Mon Journal IEF.',
        ...tokens,
      },
    }
    res.json(response)
  }
  catch (err) {
    console.error(err)
    const response: AuthResponse = {
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Erreur serveur',
      },
    }
    res.json(response)
  }
}

// Resend email verification
export async function resendEmailVerification(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const response: AuthResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: errors.array().map(error => error.msg).join(', '),
      },
    }
    res.json(response)

    return
  }

  const { email } = req.body

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      // Don't reveal if email exists or not
      const response: AuthResponse = {
        success: true,
        data: {
          message: `Si cette adresse email existe et n'est pas encore vérifiée, un nouvel email de vérification sera envoyé.`,
        },
      }
      res.json(response)

      return
    }

    if (user.emailVerified) {
      const response: AuthResponse = {
        success: false,
        error: {
          code: 'EMAIL_ALREADY_VERIFIED',
          message: 'Cette adresse email est déjà vérifiée.',
        },
      }
      res.json(response)

      return
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex')
    const emailVerificationExpires = new Date()
    emailVerificationExpires.setHours(emailVerificationExpires.getHours() + 24) // 24 hour expiration

    // Update user with new token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken,
        emailVerificationExpires,
      },
    })

    // Send new verification email
    await emailService.sendEmailVerification(user.email, user.name, emailVerificationToken)

    const response: AuthResponse = {
      success: true,
      data: {
        message: `Si cette adresse email existe et n'est pas encore vérifiée, un nouvel email de vérification sera envoyé.`,
      },
    }
    res.json(response)
  }
  catch (err) {
    console.error(err)
    const response: AuthResponse = {
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Erreur serveur',
      },
    }
    res.json(response)
  }
}
