-- AlterTable
ALTER TABLE "assessments" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "certificates" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "developers" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "subscription_payments" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "slug" TEXT;
