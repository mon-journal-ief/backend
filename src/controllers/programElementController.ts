import type { Request, Response } from 'express'
import prisma from '../config/db'

// Utility function to check if a program belongs to the authenticated user
async function checkProgramOwnership(userId: string, programId: string): Promise<boolean> {
  const userProgram = await prisma.child.findFirst({
    where: {
      userId,
      programId,
    },
    select: {
      programId: true,
    },
  })

  return !!userProgram
}

// Get single program element (must belong to user's program)
export async function getProgramElement(req: Request, res: Response) {
  const { id } = req.params

  try {
    // Get the program element first
    const programElement = await prisma.programElement.findUnique({
      where: {
        id,
      },
      include: {
        program: true,
        journalEntries: true,
        children: true,
      },
    })

    if (!programElement) {
      res.status(404).json({ message: 'Program element not found' })

      return
    }

    // Verify that the program element's program belongs to the user
    if (programElement.programId) {
      const hasPermission = await checkProgramOwnership(req.user.id, programElement.programId)
      if (!hasPermission) {
        res.status(403).json({ message: 'Access denied: Program element does not belong to user' })

        return
      }
    }

    res.json(programElement)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Create new program element (must belong to user's program)
export async function createProgramElement(req: Request, res: Response) {
  const { name, description, programId, parentId } = req.body

  try {
    // Verify that the program belongs to the user
    if (programId) {
      const hasPermission = await checkProgramOwnership(req.user.id, programId)
      if (!hasPermission) {
        res.status(403).json({ message: 'Access denied: Program does not belong to user' })

        return
      }
    }

    // If parentId is provided, verify it belongs to the same program
    if (parentId) {
      const parentElement = await prisma.programElement.findUnique({
        where: { id: parentId },
        select: { programId: true },
      })

      if (!parentElement || parentElement.programId !== programId) {
        res.status(400).json({ message: 'Invalid parent element' })

        return
      }
    }

    const programElement = await prisma.programElement.create({
      data: {
        name,
        description,
        programId,
        parentId,
      },
      include: {
        program: true,
        journalEntries: true,
        children: true,
      },
    })
    res.json(programElement)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Update program element (must belong to user's program)
export async function updateProgramElement(req: Request, res: Response) {
  const { id } = req.params
  const { name, description, parentId, isValidated } = req.body

  try {
    // First get the existing program element to check ownership
    const existingElement = await prisma.programElement.findUnique({
      where: { id },
      select: { programId: true },
    })

    if (!existingElement) {
      res.status(404).json({ message: 'Program element not found' })

      return
    }

    // Verify that the program element's program belongs to the user
    if (existingElement.programId) {
      const hasPermission = await checkProgramOwnership(req.user.id, existingElement.programId)
      if (!hasPermission) {
        res.status(403).json({ message: 'Access denied: Program element does not belong to user' })

        return
      }
    }

    // If parentId is provided, verify it belongs to the same program
    if (parentId) {
      const parentElement = await prisma.programElement.findUnique({
        where: { id: parentId },
        select: { programId: true },
      })

      if (!parentElement || parentElement.programId !== existingElement.programId) {
        res.status(400).json({ message: 'Invalid parent element' })

        return
      }
    }

    const programElement = await prisma.programElement.update({
      where: {
        id,
      },
      data: { name, description, parentId, isValidated },
      include: {
        program: true,
        journalEntries: true,
        children: true,
      },
    })

    res.json(programElement)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Validate/Unvalidate program element (must belong to user's program)
export async function validateProgramElement(req: Request, res: Response) {
  const { id } = req.params
  const { isValidated } = req.body

  try {
    // First get the existing program element to check ownership
    const existingElement = await prisma.programElement.findUnique({
      where: { id },
      select: { programId: true, isValidated: true },
    })

    if (!existingElement) {
      res.status(404).json({ message: 'Program element not found' })

      return
    }

    // Verify that the program element's program belongs to the user
    if (existingElement.programId) {
      const hasPermission = await checkProgramOwnership(req.user.id, existingElement.programId)
      if (!hasPermission) {
        res.status(403).json({ message: 'Access denied: Program element does not belong to user' })

        return
      }
    }

    // Validate the isValidated parameter
    if (typeof isValidated !== 'boolean') {
      res.status(400).json({ message: 'isValidated must be a boolean value' })

      return
    }

    const programElement = await prisma.programElement.update({
      where: {
        id,
      },
      data: { isValidated },
      include: {
        program: true,
        journalEntries: true,
        children: true,
      },
    })

    res.json(programElement)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Delete program element (must belong to user's program)
export async function deleteProgramElement(req: Request, res: Response) {
  const { id } = req.params

  try {
    // First get the existing program element to check ownership
    const existingElement = await prisma.programElement.findUnique({
      where: { id },
      select: { programId: true },
    })

    if (!existingElement) {
      res.status(404).json({ message: 'Program element not found' })

      return
    }

    // Verify that the program element's program belongs to the user
    if (existingElement.programId) {
      const hasPermission = await checkProgramOwnership(req.user.id, existingElement.programId)
      if (!hasPermission) {
        res.status(403).json({ message: 'Access denied: Program element does not belong to user' })

        return
      }
    }

    const programElement = await prisma.programElement.delete({
      where: {
        id,
      },
      include: {
        program: true,
        journalEntries: true,
        children: true,
      },
    })
    res.json(programElement)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
