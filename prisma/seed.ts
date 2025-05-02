import { PrismaClient } from "../generated/prisma/index.ts"

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.journalEntry.deleteMany()
  await prisma.child.deleteMany()
  await prisma.programElement.deleteMany()
  await prisma.program.deleteMany()

  // Create programs
  const cpProgram = await prisma.program.create({
    data: {
      name: "CP Program",
      grade: "CP"
    }
  })

  const ce1Program = await prisma.program.create({
    data: {
      name: "CE1 Program",
      grade: "CE1"
    }
  })

  // Create program elements
  const cpElement1 = await prisma.programElement.create({
    data: {
      name: "Reading",
      description: "Basic reading skills",
      programId: cpProgram.id
    }
  })

  const cpElement2 = await prisma.programElement.create({
    data: {
      name: "Writing",
      description: "Basic writing skills",
      programId: cpProgram.id
    }
  })

  const ce1Element1 = await prisma.programElement.create({
    data: {
      name: "Grammar",
      description: "Basic grammar rules",
      programId: ce1Program.id
    }
  })

  // Create children
  const emma = await prisma.child.create({
    data: {
      name: "Dubois",
      firstName: "Emma",
      age: 6,
      gender: "FEMALE",
      birthDate: new Date("2018-05-12"),
      programId: cpProgram.id
    }
  })

  const lucas = await prisma.child.create({
    data: {
      name: "Martin",
      firstName: "Lucas",
      age: 7,
      gender: "MALE",
      birthDate: new Date("2017-02-23"),
      programId: ce1Program.id
    }
  })

  // Create journal entries
  await prisma.journalEntry.create({
    data: {
      date: new Date(),
      comment: "Emma has made good progress with reading today",
      images: ["emma_reading_1.jpg", "emma_reading_2.jpg"],
      childId: emma.id,
      validatedElements: {
        connect: [{ id: cpElement1.id }]
      }
    }
  })

  await prisma.journalEntry.create({
    data: {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      comment: "Lucas practiced grammar exercises",
      images: ["lucas_grammar.jpg"],
      childId: lucas.id,
      validatedElements: {
        connect: [{ id: ce1Element1.id }]
      }
    }
  })

  console.log("Database has been seeded")
}

main()
  .catch(e => {
    console.error(e)
    Deno.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
