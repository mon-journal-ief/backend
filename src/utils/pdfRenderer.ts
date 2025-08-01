import { chromium } from 'playwright'
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

    const browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--font-render-hinting=none' // Better text rendering for French characters
      ]
    })
    
    const page = await browser.newPage()
    
    const frontendUrl = process.env.FRONTEND_URL
    const pdfUrl = `${frontendUrl}/export/pdf`
    
    await page.goto(pdfUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    })
    
    // Inject the data directly into the page
    await page.evaluate((data) => {
      // Make data available globally for the Vue app to pick up
      // @ts-expect-error - window.pdfData is not typed
      window.pdfData = data
      // Dispatch a custom event to notify the Vue app that data is ready
      window.dispatchEvent(new CustomEvent('pdfDataReady', { detail: data }))
    }, { child, journalEntries })

    console.log('📔 Data injected into page')
    
    // Wait for the page to process the data and render
    await page.waitForSelector('#pdf-container', { timeout: 10000 })
    
    // Wait for network to be idle
    await page.waitForLoadState('networkidle')

    // Ensure all images are loaded
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.querySelectorAll('img')).map(img => {
          if (img.complete) return Promise.resolve()
          return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve)
            img.addEventListener('error', reject)
          })
        })
      )
    })
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { 
        top: '1cm', 
        right: '1cm', 
        bottom: '1cm', 
        left: '1cm' 
      },
      printBackground: true
    })
    
    await browser.close()
    
    return pdfBuffer
    
  } catch (error) {
    console.error('❌📔 Error rendering journal to PDF:', error)
    throw new Error(`❌📔 Journal PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 