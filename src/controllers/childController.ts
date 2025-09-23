import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../config/db'

// Get all children for the authenticated user
export async function getChildren(req: Request, res: Response): Promise<void> {
  try {
    const children = await prisma.child.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        program: {
          include: {
            elements: {
              where: {
                parentId: null, // Only get root elements
              },
              include: {
                children: {
                  include: {
                    children: {
                      include: {
                        children: {
                          include: {
                            children: true, // Support up to 5 levels deep
                          },
                        },
                      },
                    },
                  },
                },
                journalEntries: {
                  orderBy: {
                    date: 'desc',
                  },
                },
              },
            },
          },
        },
        journalEntries: {
          orderBy: {
            date: 'desc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    res.json(children)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Get a specific child by ID
export async function getChildById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    const child = await prisma.child.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        program: {
          include: {
            elements: {
              where: {
                parentId: null, // Only get root elements
              },
              include: {
                children: {
                  include: {
                    children: {
                      include: {
                        children: {
                          include: {
                            children: true, // Support up to 5 levels deep
                            journalEntries: {
                              orderBy: {
                                date: 'desc',
                              },
                            },
                          },
                        },
                        journalEntries: {
                          orderBy: {
                            date: 'desc',
                          },
                        },
                      },
                    },
                    journalEntries: {
                      orderBy: {
                        date: 'desc',
                      },
                    },
                  },
                },
                journalEntries: {
                  orderBy: {
                    date: 'desc',
                  },
                },
              },
            },
          },
        },
        journalEntries: {
          include: {
            validatedElements: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    })

    if (!child) {
      res.status(404).json({ message: 'Child not found' })

      return
    }

    res.json(child)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Create a new child
export async function createChild(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })

    return
  }

  const { name, lastName, birthdate, gender, programId } = req.body

  try {
    // If programId is provided, verify it exists
    if (programId) {
      const program = await prisma.program.findUnique({
        where: { id: programId },
      })

      if (!program) {
        res.status(400).json({ message: 'Invalid program ID' })

        return
      }
    }

    const child = await prisma.child.create({
      data: {
        name,
        lastName,
        birthdate: birthdate ? new Date(birthdate) : null,
        gender,
        userId: req.user.id,
        programId,
      },
      include: {
        program: true,
      },
    })

    res.status(201).json(child)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Update a child
export async function updateChild(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })

    return
  }

  const { id } = req.params
  const { name, lastName, birthdate, gender, programId } = req.body

  try {
    // Check if child exists and belongs to the user
    const existingChild = await prisma.child.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    })

    if (!existingChild) {
      res.status(404).json({ message: 'Child not found' })

      return
    }

    // If programId is provided, verify it exists
    if (programId) {
      const program = await prisma.program.findUnique({
        where: { id: programId },
      })

      if (!program) {
        res.status(400).json({ message: 'Invalid program ID' })

        return
      }
    }

    const updatedChild = await prisma.child.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(lastName && { lastName }),
        ...(birthdate && { birthdate: new Date(birthdate) }),
        ...(gender && { gender }),
        ...(programId !== undefined && { programId: programId || null }),
      },
      include: {
        program: true,
      },
    })

    res.json(updatedChild)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Delete a child
export async function deleteChild(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params

    // Check if child exists and belongs to the user
    const existingChild = await prisma.child.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    })

    if (!existingChild) {
      res.status(404).json({ message: 'Child not found' })

      return
    }

    // Remove all journal entries for this child first
    await prisma.journalEntry.deleteMany({
      where: { childId: id },
    })

    // Now delete the child
    await prisma.child.delete({
      where: { id },
    })

    res.json({ message: 'Child deleted successfully' })
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
