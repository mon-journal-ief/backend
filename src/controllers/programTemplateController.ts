import { Request, Response } from 'express'
import prisma from '../config/db'
import { copyProgramElementsFromTemplate } from '../utils/programUtils'

// Get all program templates
export async function getAllProgramTemplates(req: Request, res: Response) {
    const programTemplates = await prisma.programTemplate.findMany({
        include: {
            elements: true,
            programs: true
        }
    })

    // Sort by grade (corresponding to age progression)
    const gradeOrder = ['Maternelle', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', 'Sixième', 'Cinquième', 'Quatrième', 'Troisième', 'Seconde', 'Première', 'Terminale']

    programTemplates.sort((a, b) => {
        const indexA = gradeOrder.indexOf(a.grade)
        const indexB = gradeOrder.indexOf(b.grade)
        return indexA - indexB
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
    if (!programTemplate) {
        res.status(404).json({ message: 'Program template not found' })
        return
    }
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

// Import program template for a child
export async function copyProgramTemplate(req: Request, res: Response) {
    try {
        const { templateId, childId } = req.body

        if (!templateId || !childId) {
            res.status(400).json({ message: 'Template ID and Child ID are required' })
            return
        }

        // Verify template exists
        const template = await prisma.programTemplate.findUnique({
            where: { id: templateId }
        })

        if (!template) {
            res.status(404).json({ message: 'Program template not found' })
            return
        }

        // Verify child exists
        const child = await prisma.child.findUnique({
            where: { id: childId }
        })

        if (!child) {
            res.status(404).json({ message: 'Child not found' })
            return
        }

        // If child has an existing program, orphan its program elements
        if (child.programId) {
            // Update program elements to remove programId (orphan them)
            await prisma.programElement.updateMany({
                where: { programId: child.programId },
                data: { programId: null }
            })

            // Delete the program
            await prisma.program.delete({
                where: { id: child.programId }
            })
        }

        // Create new program from template
        const newProgram = await prisma.program.create({
            data: {
                name: template.name,
                description: template.description,
                grade: template.grade,
                templateId: template.id
            }
        })

        // Copy all program elements from template to new program
        await copyProgramElementsFromTemplate(template.id, newProgram.id)

        // Link child to new program
        await prisma.child.update({
            where: { id: childId },
            data: { programId: newProgram.id }
        })

        // Return the new program with its elements
        const programWithElements = await prisma.program.findUnique({
            where: { id: newProgram.id },
            include: {
                elements: true,
                children: true,
                template: true
            }
        })

        res.json(programWithElements)
    } catch (error) {
        console.error('Error importing program template:', error)
        res.status(500).json({ message: 'Error importing program template', error })
    }
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