/*
  Warnings:

  - Added the required column `total_price` to the `subscription_payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription_payments" ADD COLUMN     "total_price" INTEGER NOT NULL;
