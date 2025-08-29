import prisma from '../config/db'

export async function renderJournalToPDF(
  childId: string,
  userId: string,
): Promise<Buffer> {
  try {
    console.log('📔 Fetching journal data for PDF generation...')
    
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: userId
      }
    })

    if (!child) {
      throw new Error('Child not found')
    }

    const journalEntries = await prisma.journalEntry.findMany({
      where: { childId },
      include: { 
        validatedElements: {
          include: {
            program: true,
            template: true
          }
        }
      },
      orderBy: { date: 'desc' }
    })

    console.log(`📔 Fetched data: child ${child.name}, ${journalEntries.length} entries`)

    // Call external Playwright service
    const scrapperServiceUrl = process.env.SCRAPPER_SERVICE_URL || 'http://localhost:7000'
    const frontendUrl = process.env.FRONTEND_URL

    if (!frontendUrl) {
      throw new Error('FRONTEND_URL environment variable is required')
    }

    const response = await fetch(`${scrapperServiceUrl}/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        child,
        journalEntries,
        frontendUrl
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Playwright service error: ${response.status} - ${errorText}`)
    }

    const pdfBuffer = Buffer.from(await response.arrayBuffer())
    
    console.log(`📔 PDF generated successfully via external service, size: ${pdfBuffer.length} bytes`)
    
    return pdfBuffer
    
  } catch (error) {
    console.error('❌📔 Error rendering journal to PDF:', error)
    throw new Error(`❌📔 Journal PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
