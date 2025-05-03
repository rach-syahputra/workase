-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "auth_id" TEXT,
ADD COLUMN     "auth_provider" "AuthProvider";
