/*
  Warnings:

  - Made the column `date` on table `JournalEntry` required. This step will fail if there are existing NULL values in that column.

*/

-- First, update existing NULL dates to use the createdAt timestamp
UPDATE "JournalEntry" SET "date" = "createdAt" WHERE "date" IS NULL;

-- AlterTable
ALTER TABLE "JournalEntry" ALTER COLUMN "date" SET NOT NULL;
