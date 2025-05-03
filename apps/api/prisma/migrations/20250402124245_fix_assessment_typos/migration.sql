/*
  Warnings:

  - You are about to drop the column `assesment_question_id` on the `question_options` table. All the data in the column will be lost.
  - You are about to drop the `assesment_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assesments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_assesments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assessment_question_id` to the `question_options` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserAssessmentStatus" AS ENUM ('PASSED', 'FAILED');

-- DropForeignKey
ALTER TABLE "assesment_questions" DROP CONSTRAINT "assesment_questions_assesment_id_fkey";

-- DropForeignKey
ALTER TABLE "assesments" DROP CONSTRAINT "assesments_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "question_options" DROP CONSTRAINT "question_options_assesment_question_id_fkey";

-- DropForeignKey
ALTER TABLE "user_assesments" DROP CONSTRAINT "user_assesments_assesment_id_fkey";

-- DropForeignKey
ALTER TABLE "user_assesments" DROP CONSTRAINT "user_assesments_user_id_fkey";

-- AlterTable
ALTER TABLE "question_options" DROP COLUMN "assesment_question_id",
ADD COLUMN     "assessment_question_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "assesment_questions";

-- DropTable
DROP TABLE "assesments";

-- DropTable
DROP TABLE "user_assesments";

-- DropEnum
DROP TYPE "UserAssesmentStatus";

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_questions" (
    "id" TEXT NOT NULL,
    "assessment_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "assessment_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_assessments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "assessment_id" TEXT NOT NULL,
    "status" "UserAssessmentStatus" NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_assessments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_questions" ADD CONSTRAINT "assessment_questions_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_assessment_question_id_fkey" FOREIGN KEY ("assessment_question_id") REFERENCES "assessment_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_assessments" ADD CONSTRAINT "user_assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_assessments" ADD CONSTRAINT "user_assessments_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
