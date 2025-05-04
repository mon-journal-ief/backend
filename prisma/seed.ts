import { PrismaClient, Gender, Grade } from '../generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Nettoyage de la base de données (optionnel)
  await prisma.journalEntry.deleteMany({})
  await prisma.programElement.deleteMany({})
  await prisma.child.deleteMany({})
  await prisma.program.deleteMany({})

  // Création des programmes
  const programCP = await prisma.program.create({
    data: {
      name: "Programme CP",
      grade: Grade.CP
    }
  })

  const programCE1 = await prisma.program.create({
    data: {
      name: "Programme CE1",
      grade: Grade.CE1
    }
  })

  const programCE2 = await prisma.program.create({
    data: {
      name: "Programme CE2",
      grade: Grade.CE2
    }
  })

  // Création des éléments de programme
  const elementsMaths = await prisma.programElement.create({
    data: {
      name: "Mathématiques - Nombres jusqu'à 100",
      description: "Apprentissage des nombres jusqu'à 100 et opérations de base",
      programId: programCP.id
    }
  })

  const elementsLecture = await prisma.programElement.create({
    data: {
      name: "Lecture - Déchiffrage",
      description: "Apprentissage des lettres et déchiffrage des mots simples",
      programId: programCP.id
    }
  })

  const elementsSciences = await prisma.programElement.create({
    data: {
      name: "Sciences - Découverte du monde vivant",
      description: "Exploration du monde animal et végétal",
      programId: programCP.id
    }
  })

  const elementsCE1Maths = await prisma.programElement.create({
    data: {
      name: "Mathématiques - Opérations avancées",
      description: "Multiplication et division simples",
      programId: programCE1.id
    }
  })

  const elementsCE1Francais = await prisma.programElement.create({
    data: {
      name: "Français - Production écrite",
      description: "Rédaction de courts paragraphes et grammaire de base",
      programId: programCE1.id
    }
  })

  const elementsCE1Histoire = await prisma.programElement.create({
    data: {
      name: "Histoire - Repères chronologiques",
      description: "Premiers repères de l'histoire de France",
      programId: programCE1.id
    }
  })

  // Création des enfants
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
      programId: programCE1.id
    }
  })

  const chloé = await prisma.child.create({
    data: {
      name: "Lefebvre",
      firstName: "Chloé",
      age: 8,
      gender: Gender.FEMALE,
      birthDate: new Date("2015-11-21"),
      programId: programCE2.id
    }
  })

  // Création des entrées de journal
  await prisma.journalEntry.create({
    data: {
      date: new Date("2023-10-15"),
      comment: "Emma a fait de grands progrès en lecture aujourd'hui. Elle a réussi à déchiffrer un texte court sans aide.",
      images: ["emma_lecture_20231015.jpg"],
      childId: emma.id,
      validatedElements: {
        connect: [{ id: elementsLecture.id }]
      }
    }
  })

  await prisma.journalEntry.create({
    data: {
      date: new Date("2023-10-16"),
      comment: "Thomas a réussi ses premiers calculs de multiplication. Il comprend bien le concept de répétition d'additions.",
      images: ["thomas_maths_20231016.jpg"],
      childId: thomas.id,
      validatedElements: {
        connect: [{ id: elementsCE1Maths.id }]
      }
    }
  })

  await prisma.journalEntry.create({
    data: {
      date: new Date("2023-10-20"),
      comment: "Chloé a réalisé une belle présentation sur les plantes de notre jardin. Elle a bien identifié les différentes parties.",
      images: ["chloe_sciences_20231020.jpg", "jardin_chloe.jpg"],
      childId: chloé.id,
      validatedElements: {
        connect: [{ id: elementsSciences.id }]
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
        connect: [{ id: elementsMaths.id }]
      }
    }
  })

  console.log("Base de données initialisée avec succès")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 