/*
  Warnings:

  - You are about to drop the column `programElementId` on the `ProgramElement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgramElement" DROP CONSTRAINT "ProgramElement_programElementId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramElement" DROP CONSTRAINT "ProgramElement_programId_fkey";

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "templateId" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ProgramElement" DROP COLUMN "programElementId",
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "programTemplateId" TEXT,
ALTER COLUMN "programId" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ProgramTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "grade" "Grade" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ProgramTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramElement" ADD CONSTRAINT "ProgramElement_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramElement" ADD CONSTRAINT "ProgramElement_programTemplateId_fkey" FOREIGN KEY ("programTemplateId") REFERENCES "ProgramTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramElement" ADD CONSTRAINT "ProgramElement_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProgramElement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
