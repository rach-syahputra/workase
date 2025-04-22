/*
  Warnings:

  - A unique constraint covering the columns `[subscription_id]` on the table `subscription_payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `subscription_payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscription_payments" DROP CONSTRAINT "subscription_payments_approved_by_fkey";

-- AlterTable
ALTER TABLE "subscription_payments" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "subscription_id" DROP NOT NULL,
ALTER COLUMN "approved_by" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subscription_payments_subscription_id_key" ON "subscription_payments"("subscription_id");

-- AddForeignKey
ALTER TABLE "subscription_payments" ADD CONSTRAINT "subscription_payments_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "developers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
