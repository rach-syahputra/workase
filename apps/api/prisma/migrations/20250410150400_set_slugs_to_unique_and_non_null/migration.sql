/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `assessments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `certificates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `subscription_payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `assessments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `certificates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `subscription_payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "assessments" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "certificates" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "subscription_payments" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "assessments_slug_key" ON "assessments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_slug_key" ON "certificates"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_slug_key" ON "jobs"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_payments_slug_key" ON "subscription_payments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");
