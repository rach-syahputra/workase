/*
  Warnings:

  - You are about to drop the column `preview` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `skill_id` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `certificates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_assessment_id]` on the table `certificates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_assessment_id` to the `certificates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_user_id_fkey";

-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "preview",
DROP COLUMN "skill_id",
DROP COLUMN "user_id",
ADD COLUMN     "user_assessment_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "certificates_user_assessment_id_key" ON "certificates"("user_assessment_id");

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_user_assessment_id_fkey" FOREIGN KEY ("user_assessment_id") REFERENCES "user_assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
