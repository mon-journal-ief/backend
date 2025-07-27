import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../config/db'

// Add user to request type
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      }
    }
  }
}

interface JwtPayload {
  user: {
    id: string
  }
}

const ADMIN_EMAILS = [
  'r@r.rr',
]

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as JwtPayload
    req.user = decoded.user
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ 
        message: 'Token expired',
        code: 'TOKEN_EXPIRED'
      })
      return
    }
    
    res.status(401).json({ message: 'Token is not valid' })
    return
  }
}

// Admin middleware - checks if user email is in admin whitelist
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { email: true }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Check if user email is in admin whitelist
    if (!ADMIN_EMAILS.includes(user.email)) {
      res.status(403).json({ 
        message: 'Access denied. Admin privileges required.',
        code: 'INSUFFICIENT_PRIVILEGES'
      })
      return
    }

    next()
  } catch (err) {
    console.error('Admin check error:', err)
    res.status(500).json({ message: 'Server error during admin verification' })
    return
  }
}