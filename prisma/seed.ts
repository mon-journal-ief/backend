import bcrypt from 'bcrypt'
import { Gender, PrismaClient } from '../generated/prisma/client'
import { resetProgramTemplates } from '../src/scripts/resetProgramTemplates'
import { copyProgramElementsFromTemplate } from '../src/utils/programUtils'

const prisma = new PrismaClient()

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
      name: `Programme Test ${firstTemplate.cycle} - Année 2025`,
      grades: firstTemplate.grades,
      cycle: firstTemplate.cycle,
      templateId: firstTemplate.id,
      description: firstTemplate.description,
    },
  })

  // Copy all program elements from template to program
  await copyProgramElementsFromTemplate(firstTemplate.id, testProgram.id)

  console.log(`✅ Programme créé avec ${await prisma.programElement.count({ where: { programId: testProgram.id } })} éléments copiés`)

  // Create user
  const hashedPassword = await bcrypt.hash('rrrrrr', 10)
  const user = await prisma.user.create({
    data: {
      id: 'b7738591-4c9c-46ba-a7f3-7b81ed81c572',
      name: `Ding dong`,
      email: `r@r.rr`,
      emailVerified: true,
      password: hashedPassword,
    },
  })

  // Create children
  const child1 = await prisma.child.create({
    data: {
      name: 'Emma',
      lastName: 'Dupont',
      birthdate: new Date('2018-03-15'), // 6 years old approximately
      gender: Gender.FEMALE,
      programId: null,
      userId: user.id,
    },
  })

  const child2 = await prisma.child.create({
    data: {
      name: 'Thomas',
      lastName: 'Martin',
      birthdate: new Date('2017-08-22'), // 7 years old approximately
      gender: Gender.MALE,
      programId: testProgram.id,
      userId: user.id,
    },
  })

  // Get some program elements for journal entries (now from the program, not template)
  const programElements = await prisma.programElement.findMany({
    where: { programId: testProgram.id },
    take: 2,
  })

  // Create journal entries
  if (programElements.length > 0) {
    await prisma.journalEntry.create({
      data: {
        date: new Date('2023-10-15'),
        comment: 'Emma a fait de grands progrès en lecture aujourd\'hui. Elle a réussi à déchiffrer un texte court sans aide.',
        images: [],
        childId: child1.id,
        validatedElements: {
          connect: [{ id: programElements[0].id }],
        },
      },
    })

    await prisma.journalEntry.create({
      data: {
        date: new Date('2023-10-25'),
        comment: 'Emma a travaillé sur les additions jusqu\'à 20 aujourd\'hui. Elle a compris le principe du report.',
        images: [],
        childId: child1.id,
        validatedElements: {
          connect: [{ id: programElements[1].id }],
        },
      },
    })
  }

  // Create a journal entry with program elements
  const programElement = await prisma.programElement.findFirst({
    where: { programId: testProgram.id },
  })

  if (programElement) {
    await prisma.journalEntry.create({
      data: {
        date: new Date('2023-10-20'),
        comment: 'Thomas a bien travaillé sur les arts plastiques aujourd\'hui. Il a créé une belle représentation de son environnement.',
        images: [],
        childId: child2.id,
        validatedElements: {
          connect: [{ id: programElement.id }],
        },
      },
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
