-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aiOnboardingShown" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "aiSuggestionsEnabled" BOOLEAN NOT NULL DEFAULT false;
