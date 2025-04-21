-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "is_password_reset" BOOLEAN;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_password_reset" BOOLEAN;
