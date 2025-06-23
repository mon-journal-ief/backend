-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_programId_fkey";

-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "programId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
