import { PrismaClient, Gender, Grade } from '../generated/prisma/client'
import { resetProgramTemplates } from '../src/scripts/resetProgramTemplates'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function copyProgramElementsFromTemplate(templateId: string, programId: string, parentId?: string): Promise<void> {
  // Get all template elements at this level
  const templateElements = await prisma.programElement.findMany({
    where: {
      programTemplateId: templateId,
      parentId: parentId
    }
  })

  for (const templateElement of templateElements) {
    // Create program element based on template element
    const programElement = await prisma.programElement.create({
      data: {
        name: templateElement.name,
        description: templateElement.description,
        programId: programId,
        parentId: parentId
      }
    })

    // Recursively copy children
    await copyProgramElementsFromTemplate(templateId, programId, programElement.id)
  }
}

async function main() {
  // Clean database (optional, only once)
  await prisma.journalEntry.deleteMany({})
  await prisma.programElement.deleteMany({})
  await prisma.child.deleteMany({})
  await prisma.program.deleteMany({})
  await prisma.programTemplate.deleteMany({})
  await prisma.user.deleteMany({})

  // Reset program templates using the modular script
  await resetProgramTemplates()

  // Get the first template and create a program from it for testing
  const firstTemplate = await prisma.programTemplate.findFirst()

  if (!firstTemplate) {
    console.log('❌ Aucun template trouvé')
    return
  }

  // Create a program based on the first template
  const testProgram = await prisma.program.create({
    data: {
      name: `Programme Test ${firstTemplate.grade} - Année 2025`,
      grade: firstTemplate.grade,
      templateId: firstTemplate.id
    }
  })

  // Copy all program elements from template to program
  await copyProgramElementsFromTemplate(firstTemplate.id, testProgram.id)

  console.log(`✅ Programme créé avec ${await prisma.programElement.count({ where: { programId: testProgram.id } })} éléments copiés`)

  // Create user
  const hashedPassword = await bcrypt.hash("rrrrrr", 10)
  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: `Ding dong`,
      email: `r@r.rr`,
      password: hashedPassword
    }
  })

  // Create children
  const child1 = await prisma.child.create({
    data: {
      name: "Emma",
      lastName: "Dupont",
      age: 6,
      gender: Gender.FEMALE,
      programId: testProgram.id,
      userId: user.id
    }
  })

  const child2 = await prisma.child.create({
    data: {
      name: "Thomas",
      lastName: "Martin",
      age: 7,
      gender: Gender.MALE,
      programId: testProgram.id,
      userId: user.id
    }
  })

  // Get some program elements for journal entries (now from the program, not template)
  const programElements = await prisma.programElement.findMany({
    where: { programId: testProgram.id },
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

  // Create a journal entry with program elements
  const programElement = await prisma.programElement.findFirst({
    where: { programId: testProgram.id }
  })

  if (programElement) {
    await prisma.journalEntry.create({
      data: {
        date: new Date("2023-10-20"),
        comment: "Thomas a bien travaillé sur les arts plastiques aujourd'hui. Il a créé une belle représentation de son environnement.",
        images: ["thomas_arts_20231020.jpg"],
        childId: child2.id,
        validatedElements: {
          connect: [{ id: programElement.id }]
        }
      }
    })
  }

  console.log('✅ Base de données initialisée avec succès avec des données de test')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 