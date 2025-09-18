import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../config/db'

// Update user preferences
export async function updateUserPreferences(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const userId = req.user.id
  const { name, aiSuggestionsEnabled, aiOnboardingShown } = req.body

  try {
    const updateData: any = {}

    if (name !== undefined) updateData.name = name
    if (aiSuggestionsEnabled !== undefined) updateData.aiSuggestionsEnabled = aiSuggestionsEnabled
    if (aiOnboardingShown !== undefined) updateData.aiOnboardingShown = aiOnboardingShown

    // If no valid fields provided, return error
    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: 'No valid preference fields provided.' })
      return
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        aiSuggestionsEnabled: true,
        aiOnboardingShown: true,
        createdAt: true,
        updatedAt: true
      }
    })

    res.json({
      message: 'User preferences updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user preferences:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

