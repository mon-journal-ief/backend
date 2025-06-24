/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Child` table. All the data in the column will be lost.
  - Made the column `userId` on table `Child` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_userId_fkey";

-- AlterTable
ALTER TABLE "Child" DROP COLUMN "birthDate",
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
