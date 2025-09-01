import prisma from '../config/db'

/**
 * Copy all program elements from a template to a program, preserving the hierarchical structure
 * @param templateId - The ID of the template to copy from
 * @param programId - The ID of the program to copy to
 */
export async function copyProgramElementsFromTemplate(
  templateId: string, 
  programId: string
): Promise<void> {
  await copyProgramElementsRecursive(templateId, programId)
}

/**
 * Internal recursive function to copy program elements from template to program
 * @param templateId - The template ID to copy from
 * @param programId - The program ID to copy to  
 * @param templateParentId - The parent template element ID (null for root level)
 * @param programParentId - The parent program element ID (null for root level)
 */
async function copyProgramElementsRecursive(
  templateId: string, 
  programId: string, 
  templateParentId: string | null = null,
  programParentId: string | null = null
): Promise<void> {
  // Get all template elements at this level (children of templateParentId)
  const templateElements = await prisma.programElement.findMany({
    where: {
      programTemplateId: templateId,
      parentId: templateParentId
    },
  })

  for (const templateElement of templateElements) {
    // Create program element based on template element
    const programElement = await prisma.programElement.create({
      data: {
        name: templateElement.name,
        description: templateElement.description,
        exercices: templateElement.exercices,
        programId: programId,
        parentId: programParentId
      }
    })

    // Recursively copy children, passing both template and program IDs
    await copyProgramElementsRecursive(
      templateId, 
      programId, 
      templateElement.id, // The template element becomes the parent for template lookup
      programElement.id   // The created program element becomes the parent for program creation
    )
  }
} 