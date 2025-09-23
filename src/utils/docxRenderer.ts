import { Buffer } from 'node:buffer'
import { AlignmentType, BorderStyle, Document, HeadingLevel, ImageRun, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from 'docx'
import sharp from 'sharp'
import prisma from '../config/db'
import { downloadFromScaleway, isScalewayConfigured } from '../services/scalewayStorageService'
import { calculateAge } from './ageCalculator'

// Helper function to extract filename from image URL
function extractFilenameFromUrl(imageUrl: string): string {
  return imageUrl.includes('/images/')
    ? imageUrl.split('/images/')[1]
    : imageUrl.split('/').pop() || imageUrl
}

// Helper function to read image file and return buffer
async function readImageFile(imageUrl: string): Promise<Buffer | null> {
  try {
    // Check if Scaleway is configured
    if (!isScalewayConfigured()) {
      return await fetchImageFromUrl(imageUrl)
    }

    const filename = extractFilenameFromUrl(imageUrl)

    // Download from Scaleway Object Storage
    const imageBuffer = await downloadFromScaleway(filename)

    return imageBuffer
  }
  catch (error) {
    console.warn(`⚠️ Could not download image from S3: ${extractFilenameFromUrl(imageUrl)}`, error)

    // Fallback: try to fetch directly from the public URL
    return await fetchImageFromUrl(imageUrl)
  }
}

// Fallback function to fetch image directly from URL
async function fetchImageFromUrl(imageUrl: string): Promise<Buffer | null> {
  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      return null
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return buffer
  }
  catch (error) {
    console.warn(`⚠️ Could not fetch image from URL: ${extractFilenameFromUrl(imageUrl)}`, error)

    return null
  }
}

// Helper function to create image runs for Word document
async function createImageRuns(images: string[]): Promise<Paragraph[]> {
  const imageParagraphs: Paragraph[] = []

  if (images.length === 0) {
    return imageParagraphs
  }

  // Add images header
  imageParagraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Images associées :',
          bold: true,
        }),
      ],
      spacing: { before: 200, after: 100 },
    }),
  )

  // Process each image
  for (const imageUrl of images) {
    const imageBuffer = await readImageFile(imageUrl)

    if (imageBuffer) {
      try {
        // Get image dimensions to calculate aspect ratio
        const metadata = await sharp(imageBuffer).metadata()
        const originalWidth = metadata.width || 400
        const originalHeight = metadata.height || 300
        const aspectRatio = originalWidth / originalHeight

        // Calculate height to maintain aspect ratio with max width of 400
        const maxWidth = 400
        const calculatedHeight = Math.round(maxWidth / aspectRatio)

        imageParagraphs.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: {
                  width: maxWidth,
                  height: calculatedHeight,
                },
                type: 'jpg', // Default type, docx will handle conversion
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 },
          }),
        )

        // Add image caption with just the filename
        const filename = extractFilenameFromUrl(imageUrl)

        imageParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: filename,
                size: 16,
                color: '6B7280',
                italics: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
        )
      }
      catch (error) {
        const filename = extractFilenameFromUrl(imageUrl)

        console.warn(`⚠️ Could not embed image: ${filename}`, error)
        // Add placeholder text for failed image
        imageParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `📷 Image: ${filename} (non disponible)`,
                color: 'DC2626',
                italics: true,
              }),
            ],
            spacing: { after: 100 },
          }),
        )
      }
    }
    else {
      const filename = extractFilenameFromUrl(imageUrl)

      // Add placeholder text for missing image
      imageParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `📷 Image: ${filename} (fichier non trouvé)`,
              color: 'DC2626',
              italics: true,
            }),
          ],
          spacing: { after: 100 },
        }),
      )
    }
  }

  return imageParagraphs
}

export async function renderJournalToDocx(
  childId: string,
  userId: string,
): Promise<Buffer> {
  try {
    console.log('📄 Fetching journal data for Word generation...')

    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId,
      },
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
            template: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    })

    console.log(`📄 Fetched data: child ${child.name}, ${journalEntries.length} entries`)

    // Create document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: 'Journal des apprentissages',
                bold: true,
                size: 32,
                color: '4F46E5',
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Child information section
          new Paragraph({
            children: [
              new TextRun({
                text: 'Informations de l\'enfant',
                bold: true,
                size: 24,
                color: '059669',
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),

          // Child info table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Nom', bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `${child.name}${child.lastName ? ` ${child.lastName}` : ''}` })] })],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              ...(calculateAge(child.birthdate)
                ? [new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: 'Âge', bold: true })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: `${calculateAge(child.birthdate)} ans` })] })],
                      }),
                    ],
                  })]
                : []),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Date d\'export', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: new Date().toLocaleDateString('fr-FR') })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Nombre d\'entrées', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: journalEntries.length.toString() })] })],
                  }),
                ],
              }),
            ],
          }),

          // Journal entries section
          new Paragraph({
            children: [
              new TextRun({
                text: 'Entrées du journal',
                bold: true,
                size: 24,
                color: '059669',
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 600, after: 200 },
          }),

          // Journal entries - process sequentially to handle async images
          ...(await Promise.all(journalEntries.map(async (entry) => {
            const entryParagraphs = [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Entrée du ${new Date(entry.date).toLocaleDateString('fr-FR')}`,
                    bold: true,
                    size: 20,
                    color: '7C3AED',
                  }),
                ],
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 400, after: 200 },
              }),
            ]

            // Add comment if exists
            if (entry.comment) {
              entryParagraphs.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Commentaire : ',
                      bold: true,
                    }),
                    new TextRun({
                      text: entry.comment,
                    }),
                  ],
                  spacing: { after: 200 },
                }),
              )
            }

            // Add validated elements if any
            if (entry.validatedElements.length > 0) {
              entryParagraphs.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Éléments validés :',
                      bold: true,
                    }),
                  ],
                  spacing: { after: 100 },
                }),
              )

              entry.validatedElements.forEach((element) => {
                entryParagraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${element.name || 'Élément sans titre'}`,
                      }),
                      ...(element.program?.name
                        ? [
                            new TextRun({
                              text: ` (${element.program.name})`,
                              italics: true,
                              color: '6B7280',
                            }),
                          ]
                        : []),
                    ],
                    spacing: { after: 50 },
                    indent: { left: 400 },
                  }),
                )
              })
            }

            // Add images if any
            if (entry.images && entry.images.length > 0) {
              const imageParagraphs = await createImageRuns(entry.images)
              entryParagraphs.push(...imageParagraphs)
            }

            // Add creation timestamp
            entryParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Créé le ${new Date(entry.createdAt).toLocaleString('fr-FR')}`,
                    size: 16,
                    color: '6B7280',
                    italics: true,
                  }),
                ],
                spacing: { after: 300 },
              }),
            )

            // Add separator line
            entryParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: '─'.repeat(50),
                    color: 'E5E7EB',
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),
            )

            return entryParagraphs
          }))).flat(),
        ],
      }],
    })

    const buffer = await Packer.toBuffer(doc)

    return buffer
  }
  catch (error) {
    console.error('❌📄 Error rendering journal to Word:', error)
    throw new Error(`❌📄 Journal Word generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
