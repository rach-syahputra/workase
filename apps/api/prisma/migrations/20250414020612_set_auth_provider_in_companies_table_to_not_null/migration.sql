/*
  Warnings:

  - Made the column `auth_provider` on table `companies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "auth_provider" SET NOT NULL;
