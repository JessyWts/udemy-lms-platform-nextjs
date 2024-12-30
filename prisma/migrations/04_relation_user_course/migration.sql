/*
  Warnings:

  - Added the required column `teacherId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "teacherId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Course_teacherId_idx" ON "Course"("teacherId");
