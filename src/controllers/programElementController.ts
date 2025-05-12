import { Request, Response } from 'express'
import prisma from '../config/db'

// Get all program elements
export async function getAllProgramElements(req: Request, res: Response) {
    const programElements = await prisma.programElement.findMany({
        include: {
            program: true,
            journalEntries: true
        }
    })

    res.json(programElements)
}

// Get single program element
export async function getProgramElement(req: Request, res: Response) {
    const { id } = req.params
    const programElement = await prisma.programElement.findUnique({
        where: {
            id: id
        },
        include: {
            program: true,
            journalEntries: true
        }
    })
    res.json(programElement)
}

// Create new program element
export async function createProgramElement(req: Request, res: Response) {
    const { name, description, programId } = req.body
    const programElement = await prisma.programElement.create({ 
        data: {
            name,
            description,
            programId
        },
        include: {
            program: true,
            journalEntries: true
        }
    })
    res.json(programElement)
}

// Update program element
export async function updateProgramElement(req: Request, res: Response) {
    const { id } = req.params
    const { name, description } = req.body

    const programElement = await prisma.programElement.update({
        where: {
            id: id
        },
        data: { name, description },
        include: {
            program: true,
            journalEntries: true
        }
    })

    res.json(programElement)
}

// Delete program element
export async function deleteProgramElement(req: Request, res: Response) {
    const { id } = req.params
    const programElement = await prisma.programElement.delete({
        where: {
            id: id
        },
        include: {
            program: true,
            journalEntries: true
        }
    })
    res.json(programElement)
} 