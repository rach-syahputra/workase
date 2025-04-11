/*
  Warnings:

  - You are about to drop the column `image` on the `assessments` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `assessments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assessments" DROP COLUMN "image",
DROP COLUMN "short_description";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "is_verified" BOOLEAN,
ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "is_verified" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "profile_photo" DROP NOT NULL,
ALTER COLUMN "place_of_birth" DROP NOT NULL,
ALTER COLUMN "date_of_birth" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "last_education" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
