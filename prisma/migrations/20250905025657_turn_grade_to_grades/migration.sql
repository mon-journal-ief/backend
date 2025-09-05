/*
  Warnings:

  - You are about to drop the column `grade` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `ProgramTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "grade",
ADD COLUMN     "grades" "Grade"[];

-- AlterTable
ALTER TABLE "ProgramTemplate" DROP COLUMN "grade",
ADD COLUMN     "grades" "Grade"[];
