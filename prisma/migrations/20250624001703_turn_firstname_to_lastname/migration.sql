/*
  Warnings:

  - You are about to drop the column `firstName` on the `Child` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Child" DROP COLUMN "firstName",
ADD COLUMN     "lastName" TEXT;
