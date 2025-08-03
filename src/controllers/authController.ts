import { Request, Response } from 'express'
import prisma from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { User } from '../../generated/prisma/client'
import crypto from 'crypto'

interface TokenResponse {
  accessToken: string
  refreshToken: string
}

function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex')
}

async function generateTokens(user: User): Promise<TokenResponse> {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken()
  
  // Store refresh token in database with 7 day expiration
  const refreshTokenExpiresAt = new Date()
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7)
  
  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken,
      refreshTokenExpiresAt
    }
  })
  
  return { accessToken, refreshToken }
}

function generateAccessToken(user: User): string {
  return jwt.sign({
    user: { id: user.id }
  }, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '1h'
  })
}

// Register user
export async function register(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const { email, password, name } = req.body

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })

    const tokens = await generateTokens(user)
    res.json(tokens)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Login user
export async function login(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const { email, password } = req.body

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    // Generate tokens
    const tokens = await generateTokens(user)
    res.json(tokens)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Refresh token
export async function refreshToken(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body

  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token is required' })
    return
  }

  try {
    // Find user with this refresh token
    const user = await prisma.user.findFirst({
      where: {
        refreshToken,
        refreshTokenExpiresAt: {
          gt: new Date() // Token must not be expired
        }
      }
    })

    if (!user) {
      res.status(401).json({ message: 'Invalid or expired refresh token' })
      return
    }

    // Generate new tokens
    const tokens = await generateTokens(user)
    res.json(tokens)
  } catch (err) {
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
        refreshTokenExpiresAt: null
      }
    })

    res.json({ message: 'Logged out successfully' })
  } catch (err) {
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
        children: {
          include: {
            program: true,
          },
          orderBy: {
            name: 'asc',
          },
        }
      },
    })

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}