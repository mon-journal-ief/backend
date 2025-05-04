import { Request, Response } from 'express'
import prisma from '../config/db'

// Get all programs
export const getAllPrograms = async (req: Request, res: Response) => {
    const programs = await prisma.program.findMany()
    res.json(programs)
}

// Get single program
export const getProgram = async (req: Request, res: Response) => {
    const { id } = req.params
    const program = await prisma.program.findUnique({
        where: {
            id: id
        }
    })
    res.json(program)
}

// Create new program
export const createProgram = async (req: Request, res: Response) => {
    const { name, description } = req.body
    const program = await prisma.program.create({ 
        data: {
            name,
            grade: "CP"
        }
    })
    res.json(program)
}

// Delete program
export const deleteProgram = async (req: Request, res: Response) => {
    const { id } = req.params
    const program = await prisma.program.delete({
        where: {
            id: id
        }
    })
    res.json(program)
}