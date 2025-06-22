-- AlterTable
ALTER TABLE "ProgramElement" ADD COLUMN     "programElementId" TEXT;

-- AddForeignKey
ALTER TABLE "ProgramElement" ADD CONSTRAINT "ProgramElement_programElementId_fkey" FOREIGN KEY ("programElementId") REFERENCES "ProgramElement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
