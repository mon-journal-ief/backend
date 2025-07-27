import { Request, Response } from 'express'
import prisma from '../config/db'

// Get all programs
export async function getAllPrograms(req: Request, res: Response) {
    const programs = await prisma.program.findMany({
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
    const program = await prisma.program.findUnique({
        where: {
            id: id
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
    const { name, grade, description } = req.body
    if (!name || !grade) {
        res.status(400).json({ message: 'Name and grade are required' })
        return
    }
    const program = await prisma.program.create({
        data: {
            name,
            grade,
            description
        }
    })
    res.json(program)
}

// Update program
export async function updateProgram(req: Request, res: Response) {
    const { id } = req.params
    const { name, grade, description } = req.body
    let program
    try {
        program = await prisma.program.update({
            where: {
                id: id
            },
            include: {
                elements: true,
                children: true
            },
            data: { name, grade, description }
        })
    } catch (error) {
        res.status(404).json({ message: 'Program not found' })
        return
    }
    res.json(program)
}

// Delete program
export async function deleteProgram(req: Request, res: Response) {
    try {
        const { id } = req.params
        
        const programExists = await prisma.program.findUnique({
            where: { id }
        })
        
        if (!programExists) {
            res.status(404).json({ message: 'Program not found' })
            return
        }
        
        const children = await prisma.child.findMany({
            where: { programId: id },
            select: { id: true }
        })
        
        await prisma.journalEntry.deleteMany({
            where: { childId: { in: children.map(child => child.id) } }
        })
        
        await prisma.child.deleteMany({
            where: { programId: id }
        })
        
        await prisma.programElement.deleteMany({
            where: { programId: id }
        })
        
        const program = await prisma.program.delete({
            where: { id }
        })
        
        res.json(program)
    } catch (error) {
        res.status(500).json({ message: 'Error deleting program', error })
    }
}