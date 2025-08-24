import { Request, Response } from 'express'
import prisma from '../config/db'
import { validationResult } from 'express-validator'

// Get all journal entries for a child (authenticated user)
export async function getJournalEntries(req: Request, res: Response) {
  try {
    const { childId } = req.params
    // Ensure the child belongs to the user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.id
      }
    })
    if (!child) {
      res.status(404).json({ message: 'Child not found' })
      return
    }
    const journalEntries = await prisma.journalEntry.findMany({
      where: { childId },
      include: { validatedElements: true },
      orderBy: { date: 'desc' }
    })
    res.json(journalEntries)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Get a specific journal entry by ID (authenticated user)
export async function getJournalEntryById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id },
      include: { validatedElements: true, child: true }
    })
    if (!journalEntry || journalEntry.child.userId !== req.user.id) {
      res.status(404).json({ message: 'Journal entry not found' })
      return
    }
    res.json(journalEntry)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Create a new journal entry
export async function createJournalEntry(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  const { childId, date, comment, images, validatedElementIds } = req.body
  try {
    // Ensure the child belongs to the user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.id
      }
    })
    if (!child) {
      res.status(404).json({ message: 'Child not found' })
      return
    }
    const journalEntry = await prisma.journalEntry.create({
      data: {
        date: new Date(date),
        comment,
        images,
        childId,
        validatedElements: validatedElementIds && validatedElementIds.length > 0
          ? { connect: validatedElementIds.map((id: string) => ({ id })) }
          : undefined
      },
      include: { validatedElements: true }
    })
    res.status(201).json(journalEntry)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Update a journal entry
export async function updateJournalEntry(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  const { id } = req.params
  const { date, comment, images, validatedElementIds } = req.body
  try {
    // Find the journal entry and ensure it belongs to the user
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id },
      include: { child: true }
    })
    if (!journalEntry || journalEntry.child.userId !== req.user.id) {
      res.status(404).json({ message: 'Journal entry not found' })
      return
    }
    const updatedJournalEntry = await prisma.journalEntry.update({
      where: { id },
      data: {
        date: new Date(date),
        comment,
        ...(images && { images }),
        ...(validatedElementIds && {
          validatedElements: {
            set: validatedElementIds.map((id: string) => ({ id }))
          }
        })
      },
      include: { validatedElements: true }
    })
    res.json(updatedJournalEntry)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Delete a journal entry
export async function deleteJournalEntry(req: Request, res: Response) {
  try {
    const { id } = req.params
    // Find the journal entry and ensure it belongs to the user
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id },
      include: { child: true }
    })
    if (!journalEntry || journalEntry.child.userId !== req.user.id) {
      res.status(404).json({ message: 'Journal entry not found' })
      return
    }
    await prisma.journalEntry.delete({ where: { id } })
    res.json({ message: 'Journal entry deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
} 