/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `developers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `developers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "developers" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "developers_slug_key" ON "developers"("slug");
