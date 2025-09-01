/*
  Warnings:

  - Made the column `cycle` on table `ProgramTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sources` on table `ProgramTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "cycle" INTEGER,
ADD COLUMN     "sources" JSONB;

-- AlterTable
ALTER TABLE "ProgramTemplate" ALTER COLUMN "cycle" SET NOT NULL,
ALTER COLUMN "sources" SET NOT NULL;
