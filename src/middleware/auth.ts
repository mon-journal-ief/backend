import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

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
    res.status(401).json({ message: 'Token is not valid' })
    return
  }
}