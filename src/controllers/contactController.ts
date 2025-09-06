import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import emailService from '../services/emailService'
import prisma from '../config/db'

interface ContactFormData {
  subject: string
  message: string
  email?: string // For the landing page
}

export async function sendContactMessage(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const { subject, message, email }: ContactFormData = req.body
  
  try {
    let userEmail = 'utilisateur-anonyme@example.com'
    let userName = 'Utilisateur anonyme'

    // If user is authenticated, fetch their information from database
    // Use type assertion since we know this route has optional authentication
    const userId = (req as any).user?.id
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { 
          name: true, 
          email: true 
        }
      })

      if (user) {
        userEmail = user.email
        userName = user.name
      }
    } else if (email) {
      userEmail = email
      userName = 'Visiteur de la landing page'
    }

    // Send email to admin/support team
    await emailService.sendContactFormEmail({
      fromEmail: userEmail,
      fromName: userName,
      subject,
      message
    })

    res.json({ 
      message: 'Votre message a été envoyé avec succès. Nous vous recontacterons prochainement.',
      success: true 
    })
  } catch (error) {
    console.error('Error sending contact message:', error)
    res.status(500).json({ 
      message: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.',
      success: false 
    })
  }
}
