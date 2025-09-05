import { PrismaClient, Grade } from '../../generated/prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface ProgramElementData {
  name: string
  description: string
  exercices?: string[]
  children?: ProgramElementData[]
}

interface ProgramTemplateData {
  name: string
  description: string
  grades: string[]
  sources?: {
    name: string
    url: string
  }[]
  cycle?: number
  elements: ProgramElementData[]
}

interface SeedData {
  programTemplate: ProgramTemplateData
}

async function createProgramElements(
  elements: ProgramElementData[],
  templateId: string,
  parentId?: string
): Promise<void> {
  for (const element of elements) {
    const createdElement = await prisma.programElement.create({
      data: {
        name: element.name,
        description: element.description,
        exercices: element.exercices || [],
        programTemplateId: templateId,
        parentId: parentId
      }
    })

    // Recursively create children if they exist
    if (element.children && element.children.length > 0) {
      await createProgramElements(element.children, templateId, createdElement.id)
    }
  }
}

async function seedFromFile(jsonPath: string) {
  const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
  const seedData: SeedData = JSON.parse(jsonContent)

  // Create the program template
  const programTemplate = await prisma.programTemplate.create({
    data: {
      name: seedData.programTemplate.name,
      description: seedData.programTemplate.description,
      grades: seedData.programTemplate.grades as Grade[],
      sources: seedData.programTemplate.sources!,
      cycle: seedData.programTemplate.cycle!
    }
  })

  // Create all program elements with their hierarchical structure
  await createProgramElements(seedData.programTemplate.elements, programTemplate.id)

  console.log(`Template créé: ${programTemplate.name}`)
  
  const elementCount = await prisma.programElement.count({
    where: { programTemplateId: programTemplate.id }
  })
  console.log(`${elementCount} éléments de programme créés pour ${programTemplate.cycle}`)
}

async function resetProgramTemplates() {
  console.log('🗑️  Suppression des templates de programme...')
  
  // Delete all program elements associated with templates
  await prisma.programElement.deleteMany({
    where: { 
      programTemplateId: { not: null }
    }
  })
  
  // Delete all program templates
  await prisma.programTemplate.deleteMany({})

  console.log('✅ Templates de programme supprimés')
  
  // Read all seed files in the directory
  const seedsDir = path.join(__dirname, '../assets/program_templates')
  const files = fs.readdirSync(seedsDir).filter(f => f.endsWith('.json'))

  console.log(`📥 Importation de ${files.length} template(s)...`)

  for (const file of files) {
    const jsonPath = path.join(seedsDir, file)
    await seedFromFile(jsonPath)
  }
  
  console.log('✅ Templates de programme réimportés avec succès')
}

// Allow this script to be run directly or imported
if (require.main === module) {
  resetProgramTemplates()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export { resetProgramTemplates } 