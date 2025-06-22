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

async function main() {
  // Clean database (optional)
  await prisma.journalEntry.deleteMany({})
  await prisma.programElement.deleteMany({})
  await prisma.child.deleteMany({})
  await prisma.program.deleteMany({})
  await prisma.programTemplate.deleteMany({})

  // Read and parse the JSON file
  const jsonPath = path.join(__dirname, '../src/assets/program_templates/seed_cp.json')
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
  const programCP = await prisma.program.create({
    data: {
      name: "Programme CP - Année 2024",
      grade: Grade.CP,
      templateId: programTemplate.id
    }
  })

  // Create children
  const emma = await prisma.child.create({
    data: {
      name: "Dupont",
      firstName: "Emma",
      age: 6,
      gender: Gender.FEMALE,
      birthDate: new Date("2017-05-12"),
      programId: programCP.id
    }
  })

  const thomas = await prisma.child.create({
    data: {
      name: "Martin",
      firstName: "Thomas",
      age: 7,
      gender: Gender.MALE,
      birthDate: new Date("2016-09-03"),
      programId: programCP.id
    }
  })

  // Get some program elements for journal entries
  const programElements = await prisma.programElement.findMany({
    where: { programId: programCP.id },
    take: 2
  })

  // Create journal entries
  if (programElements.length > 0) {
    await prisma.journalEntry.create({
      data: {
        date: new Date("2023-10-15"),
        comment: "Emma a fait de grands progrès en lecture aujourd'hui. Elle a réussi à déchiffrer un texte court sans aide.",
        images: ["emma_lecture_20231015.jpg"],
        childId: emma.id,
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
        childId: emma.id,
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
        childId: thomas.id,
        validatedElements: {
          connect: [{ id: templateElement.id }]
        }
      }
    })
  }

  console.log("Base de données initialisée avec succès avec les données du template CP")
  console.log(`Template créé: ${programTemplate.name}`)
  
  const elementCount = await prisma.programElement.count({
    where: { programTemplateId: programTemplate.id }
  })
  console.log(`${elementCount} éléments de programme créés`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 