import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, ImageRun } from 'docx'
import prisma from '../config/db'
import fs from 'fs/promises'
import path from 'path'
import { calculateAge } from './ageCalculator'

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'images')

// Helper function to read image file and return buffer
async function readImageFile(filename: string): Promise<Buffer | null> {
  try {
    const imagePath = path.join(UPLOAD_DIR, filename)
    const imageBuffer = await fs.readFile(imagePath)
    return imageBuffer
  } catch (error) {
    console.warn(`⚠️ Could not read image file: ${filename}`, error)
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
          text: "Images associées :",
          bold: true
        })
      ],
      spacing: { before: 200, after: 100 }
    })
  )

  // Process each image
  for (const imageName of images) {
    const imageBuffer = await readImageFile(imageName)
    
    if (imageBuffer) {
      try {
        imageParagraphs.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: {
                  width: 400, // 400 pixels wide
                  height: 300, // 300 pixels high (will maintain aspect ratio)
                },
                type: 'jpg', // Default type, docx will handle conversion
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 }
          })
        )
        
        // Add image caption
        imageParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: imageName,
                size: 16,
                color: "6B7280",
                italics: true
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          })
        )
      } catch (error) {
        console.warn(`⚠️ Could not embed image: ${imageName}`, error)
        // Add placeholder text for failed image
        imageParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `📷 Image: ${imageName} (non disponible)`,
                color: "DC2626",
                italics: true
              })
            ],
            spacing: { after: 100 }
          })
        )
      }
    } else {
      // Add placeholder text for missing image
      imageParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `📷 Image: ${imageName} (fichier non trouvé)`,
              color: "DC2626",
              italics: true
            })
          ],
          spacing: { after: 100 }
        })
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
                text: "Journal des apprentissages",
                bold: true,
                size: 32,
                color: "4F46E5"
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // Child information section
          new Paragraph({
            children: [
              new TextRun({
                text: "Informations de l'enfant",
                bold: true,
                size: 24,
                color: "059669"
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
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
                    children: [new Paragraph({ children: [new TextRun({ text: "Nom", bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE }
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `${child.name}${child.lastName ? ` ${child.lastName}` : ''}` })] })],
                    width: { size: 70, type: WidthType.PERCENTAGE }
                  })
                ]
              }),
              ...(calculateAge(child.birthdate) ? [new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Âge", bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `${calculateAge(child.birthdate)} ans` })] })],
                  })
                ]
              })] : []),
              ...(child.gender ? [new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Genre", bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: child.gender })] })],
                  })
                ]
              })] : []),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Date d'export", bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: new Date().toLocaleDateString('fr-FR') })] })],
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Nombre d'entrées", bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: journalEntries.length.toString() })] })],
                  })
                ]
              })
            ]
          }),

          // Journal entries section
          new Paragraph({
            children: [
              new TextRun({
                text: "Entrées du journal",
                bold: true,
                size: 24,
                color: "059669"
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 600, after: 200 }
          }),

          // Journal entries - process sequentially to handle async images
          ...(await Promise.all(journalEntries.map(async entry => {
            const entryParagraphs = [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Entrée du ${new Date(entry.date).toLocaleDateString('fr-FR')}`,
                    bold: true,
                    size: 20,
                    color: "7C3AED"
                  })
                ],
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 400, after: 200 }
              })
            ]
            
            // Add comment if exists
            if (entry.comment) {
              entryParagraphs.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Commentaire : ",
                      bold: true
                    }),
                    new TextRun({
                      text: entry.comment
                    })
                  ],
                  spacing: { after: 200 }
                })
              )
            }

            // Add validated elements if any
            if (entry.validatedElements.length > 0) {
              entryParagraphs.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Éléments validés :",
                      bold: true
                    })
                  ],
                  spacing: { after: 100 }
                })
              )
              
              entry.validatedElements.forEach(element => {
                entryParagraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `• ${element.name || 'Élément sans titre'}`,
                      }),
                      ...(element.program?.name ? [
                        new TextRun({
                          text: ` (${element.program.name})`,
                          italics: true,
                          color: "6B7280"
                        })
                      ] : [])
                    ],
                    spacing: { after: 50 },
                    indent: { left: 400 }
                  })
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
                    color: "6B7280",
                    italics: true
                  })
                ],
                spacing: { after: 300 }
              })
            )

            // Add separator line
            entryParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: "─".repeat(50),
                    color: "E5E7EB"
                  })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 }
              })
            )

            return entryParagraphs
          }))).flat()
        ]
      }]
    })

    const buffer = await Packer.toBuffer(doc)
    
    return buffer
    
  } catch (error) {
    console.error('❌📄 Error rendering journal to Word:', error)
    throw new Error(`❌📄 Journal Word generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}