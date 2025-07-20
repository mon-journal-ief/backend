import { PrismaClient, Gender, Grade } from '../generated/prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface ProgramElementData {
  name: string
  description: string
  children?: ProgramElementData[]
}

interface ProgramTemplateData {
  name: string
  description: string
  grade: string
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
      grade: seedData.programTemplate.grade as Grade
    }
  })

  // Create all program elements with their hierarchical structure
  await createProgramElements(seedData.programTemplate.elements, programTemplate.id)

  // Create program based on the template
  const program = await prisma.program.create({
    data: {
      name: `Programme ${seedData.programTemplate.grade} - Année 2025`,
      grade: seedData.programTemplate.grade as Grade,
      templateId: programTemplate.id
    }
  })

  // Create user
  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: `Ding dong`,
      email: `r@r.rr`,
      password: "rrrrrr"
    }
  })

  // Create children
  const child1 = await prisma.child.create({
    data: {
      name: "Emma",
      lastName: "Dupont",
      age: 6,
      gender: Gender.FEMALE,
      programId: program.id,
      userId: user.id
    }
  })

  const child2 = await prisma.child.create({
    data: {
      name: "Thomas",
      lastName: "Martin",
      age: 7,
      gender: Gender.MALE,
      programId: program.id,
      userId: user.id
    }
  })

  // Get some program elements for journal entries
  const programElements = await prisma.programElement.findMany({
    where: { programId: program.id },
    take: 2
  })

  // Create journal entries
  if (programElements.length > 0) {
    await prisma.journalEntry.create({
      data: {
        date: new Date("2023-10-15"),
        comment: "Emma a fait de grands progrès en lecture aujourd'hui. Elle a réussi à déchiffrer un texte court sans aide.",
        images: ["emma_lecture_20231015.jpg"],
        childId: child1.id,
        validatedElements: {
          connect: [{ id: programElements[0].id }]
        }
      }
    })

    await prisma.journalEntry.create({
      data: {
        date: new Date("2023-10-25"),
        comment: "Emma a travaillé sur les additions jusqu'à 20 aujourd'hui. Elle a compris le principe du report.",
        images: ["emma_maths_20231025.jpg"],
        childId: child1.id,
        validatedElements: {
          connect: [{ id: programElements[1].id }]
        }
      }
    })
  }

  // Create a journal entry with template elements
  const templateElement = await prisma.programElement.findFirst({
    where: { programTemplateId: programTemplate.id }
  })

  if (templateElement) {
    await prisma.journalEntry.create({
      data: {
        date: new Date("2023-10-20"),
        comment: "Thomas a bien travaillé sur les arts plastiques aujourd'hui. Il a créé une belle représentation de son environnement.",
        images: ["thomas_arts_20231020.jpg"],
        childId: child2.id,
        validatedElements: {
          connect: [{ id: templateElement.id }]
        }
      }
    })
  }

  console.log(`Base de données initialisée avec succès avec les données du template ${programTemplate.grade}`)
  console.log(`Template créé: ${programTemplate.name}`)
  
  const elementCount = await prisma.programElement.count({
    where: { programTemplateId: programTemplate.id }
  })
  console.log(`${elementCount} éléments de programme créés pour ${programTemplate.grade}`)
}

async function main() {
  // Clean database (optional, only once)
  await prisma.journalEntry.deleteMany({})
  await prisma.programElement.deleteMany({})
  await prisma.child.deleteMany({})
  await prisma.program.deleteMany({})
  await prisma.programTemplate.deleteMany({})
  await prisma.user.deleteMany({})

  // Read all seed files in the directory
  const seedsDir = path.join(__dirname, '../src/assets/program_templates')
  const files = fs.readdirSync(seedsDir).filter(f => f.endsWith('.json'))

  for (const file of files) {
    const jsonPath = path.join(seedsDir, file)
    await seedFromFile(jsonPath)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 