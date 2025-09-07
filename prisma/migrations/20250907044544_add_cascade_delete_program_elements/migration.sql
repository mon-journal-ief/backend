-- DropForeignKey
ALTER TABLE "ProgramElement" DROP CONSTRAINT "ProgramElement_parentId_fkey";

-- AddForeignKey
ALTER TABLE "ProgramElement" ADD CONSTRAINT "ProgramElement_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProgramElement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
