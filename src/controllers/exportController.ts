import type { Request, Response } from 'express'
import prisma from '../config/db'
import { renderJournalToDocx } from '../utils/docxRenderer'
import { renderJournalToPDF } from '../utils/pdfRendererService'

// Export journal entries to PDF for a child
export async function exportJournalEntriesToPDF(req: Request, res: Response) {
  try {
    const { childId } = req.params

    // Ensure the child belongs to the user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.id,
      },
    })

    if (!child) {
      res.status(404).json({ message: 'Child not found' })

      return
    }

    const pdfBuffer = await renderJournalToPDF(childId, req.user.id)

    // Set response headers for PDF download
    const fileName = `journal-${child.name}-${new Date().toISOString().split('T')[0]}.pdf`
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Length', pdfBuffer.length.toString())

    // Send PDF buffer
    res.send(pdfBuffer)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Export journal entries to Word for a child
export async function exportJournalEntriesToWord(req: Request, res: Response) {
  try {
    const { childId } = req.params

    // Ensure the child belongs to the user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.id,
      },
    })

    if (!child) {
      res.status(404).json({ message: 'Child not found' })

      return
    }

    const docxBuffer = await renderJournalToDocx(childId, req.user.id)

    // Set response headers for Word document download
    const fileName = `journal-${child.name}-${new Date().toISOString().split('T')[0]}.docx`
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Length', docxBuffer.length.toString())

    // Send Word document buffer
    res.send(docxBuffer)
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
