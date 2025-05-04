import { Request, Response } from 'express'
import prisma from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { User } from '../../generated/prisma/client'

function generateToken(user: User): string {
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

    const token = generateToken(user)
    res.json({ token })
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

    // Create JWT
    const token = generateToken(user)
    res.json({ token })
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
      select: { id: true, name: true, email: true }
    })

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}