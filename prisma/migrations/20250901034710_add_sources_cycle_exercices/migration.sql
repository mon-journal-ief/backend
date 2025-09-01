-- AlterTable
ALTER TABLE "ProgramElement" ADD COLUMN     "exercices" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "ProgramTemplate" ADD COLUMN     "cycle" INTEGER,
ADD COLUMN     "sources" JSONB;
