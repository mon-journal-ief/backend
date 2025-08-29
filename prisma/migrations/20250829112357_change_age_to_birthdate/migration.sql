/*
  Warnings:

  - You are about to drop the column `age` on the `Child` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Child" DROP COLUMN "age",
ADD COLUMN     "birthdate" TIMESTAMP(3);
