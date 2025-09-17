import { Request, Response } from 'express'
import prisma from '../config/db'
import { validationResult } from 'express-validator'

// Get all journal entries for a child (authenticated user)
export async function getJournalEntries(req: Request, res: Response) {
  try {
    const { childId } = req.params
    // Ensure the child belongs to the user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.id
      }
    })
    if (!child) {
      res.status(404).json({ message: 'Child not found' })
      return
    }
    const journalEntries = await prisma.journalEntry.findMany({
      where: { childId },
      include: { validatedElements: true },
      orderBy: { date: 'desc' }
    })
    res.json(journalEntries)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Get a specific journal entry by ID (authenticated user)
export async function getJournalEntryById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id },
      include: { validatedElements: true, child: true }
    })
    if (!journalEntry || journalEntry.child.userId !== req.user.id) {
      res.status(404).json({ message: 'Journal entry not found' })
      return
    }
    res.json(journalEntry)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Create a new journal entry
export async function createJournalEntry(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  const { childId, date, comment, images, validatedElementIds } = req.body
  try {
    // Ensure the child belongs to the user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.id
      }
    })
    if (!child) {
      res.status(404).json({ message: 'Child not found' })
      return
    }
    const journalEntry = await prisma.journalEntry.create({
      data: {
        date: new Date(date),
        comment,
        images,
        childId,
        validatedElements: validatedElementIds && validatedElementIds.length > 0
          ? { connect: validatedElementIds.map((id: string) => ({ id })) }
          : undefined
      },
      include: { validatedElements: true }
    })
    res.status(201).json(journalEntry)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Update a journal entry
export async function updateJournalEntry(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  const { id } = req.params
  const { date, comment, images, validatedElementIds } = req.body
  try {
    // Find the journal entry and ensure it belongs to the user
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id },
      include: { child: true }
    })
    if (!journalEntry || journalEntry.child.userId !== req.user.id) {
      res.status(404).json({ message: 'Journal entry not found' })
      return
    }
    const updatedJournalEntry = await prisma.journalEntry.update({
      where: { id },
      data: {
        date: new Date(date),
        comment,
        ...(images && { images }),
        ...(validatedElementIds && {
          validatedElements: {
            set: validatedElementIds.map((id: string) => ({ id }))
          }
        })
      },
      include: { validatedElements: true }
    })
    res.json(updatedJournalEntry)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Delete a journal entry
export async function deleteJournalEntry(req: Request, res: Response) {
  try {
    const { id } = req.params
    // Find the journal entry and ensure it belongs to the user
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id },
      include: { child: true }
    })
    if (!journalEntry || journalEntry.child.userId !== req.user.id) {
      res.status(404).json({ message: 'Journal entry not found' })
      return
    }
    await prisma.journalEntry.delete({ where: { id } })
    res.json({ message: 'Journal entry deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Get AI suggestions for journal entry based on child's program
export async function getSuggestion(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  const { childId, comment } = req.body

  try {
    // Ensure the child belongs to the user and get their program
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: req.user.id
      },
      include: {
        program: {
          include: {
            elements: {
              include: {
                children: {
                  include: {
                    children: true // Include nested children for full hierarchy
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!child) {
      res.status(404).json({ message: 'Child not found' })
      return
    }

    if (!child.program) {
      res.status(404).json({ message: 'No program found for this child' })
      return
    }

    const formattedProgram = formatProgramForLLM(child.program)
    const prompt = createLLMPrompt(formattedProgram, comment)

    const llmResponse = await callMammouth(prompt)
    
    // Parse the JSON response from LLM
    let suggestedIds: string[] = []
    try {
      const parsedResponse = JSON.parse(llmResponse)
      suggestedIds = parsedResponse.suggestions || []
    } catch (error) {
      console.error('Error parsing LLM response:', error)
      res.status(500).json({ message: 'Error with AI response' })
      return
    }

    // Fetch the actual program elements based on suggested IDs
    const suggestions = await prisma.programElement.findMany({
      where: {
        id: { in: suggestedIds },
        programId: child.program.id // Ensure elements belong to the child's program
      }
    })
    
    res.json(suggestions)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// Helper function to format program data for LLM consumption
function formatProgramForLLM(program: any): string {
  function formatElement(element: any, level = 0): string {
    const indent = '  '.repeat(level)
    let result = `${indent}- [ID: ${element.id}] ${element.name}: ${element.description}\n`
    
    if (element.exercices && element.exercices.length) {
      result += `${indent}  Exercices: ${element.exercices.join(', ')}\n`
    }
    
    if (element.children && element.children.length) {
      result += element.children.map((child: any) => formatElement(child, level + 1)).join('')
    }
    
    return result
  }

  let formatted = `Programme: ${program.name}\n`
  formatted += `Description: ${program.description}\n`
  formatted += `Niveaux: ${program.grades.join(', ')}\n\n`
  formatted += `Éléments du programme:\n`
  formatted += program.elements.map((element: any) => formatElement(element)).join('\n')
  
  return formatted
}

// Helper function to create the LLM prompt
function createLLMPrompt(formattedProgram: string, comment: string): string {
  return `Tu es un assistant pédagogique qui aide les parents dans l'instruction en famille. 

Voici le programme scolaire de l'enfant (chaque élément a un ID entre crochets):
${formattedProgram}

Le parent a écrit ce commentaire dans le journal de bord:
"${comment}"

Ta tâche est d'analyser ce commentaire et d'identifier quels éléments du programme correspondent aux activités décrites. Utilise les IDs fournis entre crochets [ID: xxx].

Réponds UNIQUEMENT avec un objet JSON valide contenant les IDs des éléments de programme qui correspondent le mieux au commentaire. Limite-toi aux 5 suggestions les plus pertinentes.

Format de réponse attendu (JSON uniquement, pas de texte avant ou après):
{
  "suggestions": ["element_id_1", "element_id_2", "element_id_3"]
}

Sois précis dans tes suggestions et ne propose que des éléments vraiment en rapport avec l'activité décrite.`
} 

async function callMammouth(prompt: string) {
  const url = "https://api.mammouth.ai/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${process.env.MAMMOUTH_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    model: "gpt-5-nano",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}