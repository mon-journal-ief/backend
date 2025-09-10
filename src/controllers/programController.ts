import { Request, Response } from 'express'
import prisma from '../config/db'

// Get all programs for the user
export async function getAllPrograms(req: Request, res: Response) {
    const programs = await prisma.program.findMany({
        where: {
            children: {
                some: {
                    userId: req.user.id
                }
            }
        },
        include: {
            elements: true,
            children: true
        }
    })
    if (!programs || programs.length === 0) {
        res.status(404).json({ message: 'No programs found' })
        return
    }
    res.json(programs)
}

// Get single program
export async function getProgram(req: Request, res: Response) {
    const { id } = req.params
    const program = await prisma.program.findFirst({
        where: {
            id: id,
            children: {
                some: {
                    userId: req.user.id
                }
            }
        },
        include: {
            elements: true,
            children: true
        }
    })
    if (!program) {
        res.status(404).json({ message: 'Program not found' })
        return
    }
    res.json(program)
}

// Create new program
export async function createProgram(req: Request, res: Response) {
    const { name, grades, description, childId } = req.body
    if (!name || !childId) {
        res.status(400).json({ message: 'Name and child are required' })
        return
    }

    try {
        // Verify the child belongs to the authenticated user
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

        const program = await prisma.program.create({
            data: {
                name,
                grades,
                description,
                children: {
                    connect: [{ id: childId }]
                }
            }
        })

        res.json(program)
    } catch (error) {
        console.error('Error creating program:', error)
        res.status(500).json({ message: 'Error creating program' })
    }
}

// Update program
export async function updateProgram(req: Request, res: Response) {
    const { id } = req.params
    const { name, grades, description } = req.body
    
    try {
        // First verify the program belongs to the user
        const existingProgram = await prisma.program.findFirst({
            where: {
                id: id,
                children: {
                    some: {
                        userId: req.user.id
                    }
                }
            }
        })

        if (!existingProgram) {
            res.status(404).json({ message: 'Program not found' })
            return
        }

        const program = await prisma.program.update({
            where: {
                id: id
            },
            include: {
                elements: true,
                children: true
            },
            data: { name, grades, description }
        })
        
        res.json(program)
    } catch (error) {
        console.error('Error updating program:', error)
        res.status(500).json({ message: 'Error updating program' })
    }
}

// Delete program
export async function deleteProgram(req: Request, res: Response) {
    try {
        const { id } = req.params
        
        // Verify the program belongs to the user
        const programExists = await prisma.program.findFirst({
            where: {
                id: id,
                children: {
                    some: {
                        userId: req.user.id
                    }
                }
            }
        })
        
        if (!programExists) {
            res.status(404).json({ message: 'Program not found' })
            return
        }
        
        const children = await prisma.child.findMany({
            where: { 
                programId: id,
                userId: req.user.id
            },
            select: { id: true }
        })
        
        await prisma.journalEntry.deleteMany({
            where: { childId: { in: children.map(child => child.id) } }
        })
        
        await prisma.child.updateMany({
            where: { 
                programId: id,
                userId: req.user.id
            },
            data: { programId: null }
        })
        
        await prisma.programElement.deleteMany({
            where: { programId: id }
        })
        
        const program = await prisma.program.delete({
            where: { id }
        })
        
        res.json(program)
    } catch (error) {
        console.error('Error deleting program:', error)
        res.status(500).json({ message: 'Error deleting program', error })
    }
}