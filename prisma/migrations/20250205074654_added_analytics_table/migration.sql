/*
  Warnings:

  - Made the column `buttonText` on table `Form` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "buttonText" SET NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "country" TEXT;

-- CreateTable
CREATE TABLE "FormAnalytics" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "totalSubmissions" INTEGER NOT NULL DEFAULT 0,
    "dailySubmissions" JSONB NOT NULL,
    "countryCounts" JSONB NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormAnalytics_formId_key" ON "FormAnalytics"("formId");

-- CreateIndex
CREATE INDEX "FormAnalytics_formId_idx" ON "FormAnalytics"("formId");

-- AddForeignKey
ALTER TABLE "FormAnalytics" ADD CONSTRAINT "FormAnalytics_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
