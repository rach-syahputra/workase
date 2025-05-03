/*
  Warnings:

  - Added the required column `session_token` to the `user_assessments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_assessments" ADD COLUMN     "session_token" TEXT NOT NULL;
