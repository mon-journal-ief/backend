/*
  Warnings:

  - The values [Maternelle] on the enum `Grade` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Grade_new" AS ENUM ('PS', 'MS', 'GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', 'Sixième', 'Cinquième', 'Quatrième', 'Troisième', 'Seconde', 'Première', 'Terminale');
ALTER TABLE "ProgramTemplate" ALTER COLUMN "grade" TYPE "Grade_new" USING ("grade"::text::"Grade_new");
ALTER TABLE "Program" ALTER COLUMN "grade" TYPE "Grade_new" USING ("grade"::text::"Grade_new");
ALTER TYPE "Grade" RENAME TO "Grade_old";
ALTER TYPE "Grade_new" RENAME TO "Grade";
DROP TYPE "Grade_old";
COMMIT;
