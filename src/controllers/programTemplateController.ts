import { Request, Response } from 'express'
import prisma from '../config/db'

// Get all program templates
export async function getAllProgramTemplates(req: Request, res: Response) {
    const programTemplates = await prisma.programTemplate.findMany({
        include: {
            elements: true,
            programs: true
        }
    })

    res.json(programTemplates)
}

// Get single program template
export async function getProgramTemplate(req: Request, res: Response) {
    const { id } = req.params
    const programTemplate = await prisma.programTemplate.findUnique({
        where: {
            id: id
        },
        include: {
            elements: true,
            programs: true
        }
    })
    res.json(programTemplate)
}

// Create new program template
export async function createProgramTemplate(req: Request, res: Response) {
    const { name, description, grade } = req.body
    const programTemplate = await prisma.programTemplate.create({
        data: {
            name,
            description,
            grade
        }
    })
    res.json(programTemplate)
}

// Update program template
export async function updateProgramTemplate(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, grade } = req.body
    const programTemplate = await prisma.programTemplate.update({
        where: {
            id: id
        },
        include: {
            elements: true,
            programs: true
        },
        data: { name, description, grade }
    })
    res.json(programTemplate)
}

// Delete program template
export async function deleteProgramTemplate(req: Request, res: Response) {
    try {
        const { id } = req.params

        const templateExists = await prisma.programTemplate.findUnique({
            where: { id }
        })

        if (!templateExists) {
            res.status(404).json({ message: 'Program template not found' })
            return
        }

        // Delete related program elements first
        await prisma.programElement.deleteMany({
            where: { programTemplateId: id }
        })

        // Update programs that reference this template to remove the reference
        await prisma.program.updateMany({
            where: { templateId: id },
            data: { templateId: null }
        })

        const programTemplate = await prisma.programTemplate.delete({
            where: { id }
        })

        res.json(programTemplate)
    } catch (error) {
        res.status(500).json({ message: 'Error deleting program template', error })
    }
} 