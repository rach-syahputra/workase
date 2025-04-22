/*
  Warnings:

  - Made the column `subscription_id` on table `subscription_payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "subscription_payments" ALTER COLUMN "subscription_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "expires_at" DROP NOT NULL;
