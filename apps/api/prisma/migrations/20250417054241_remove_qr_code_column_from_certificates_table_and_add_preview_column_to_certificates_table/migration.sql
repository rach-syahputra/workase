/*
  Warnings:

  - You are about to drop the column `qr_code` on the `certificates` table. All the data in the column will be lost.
  - Added the required column `preview` to the `certificates` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "certificates_qr_code_key";

-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "qr_code",
ADD COLUMN     "preview" TEXT NOT NULL;
