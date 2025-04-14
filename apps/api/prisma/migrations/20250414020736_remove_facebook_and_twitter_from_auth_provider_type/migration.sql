/*
  Warnings:

  - The values [FACEBOOK,TWITTER] on the enum `AuthProvider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthProvider_new" AS ENUM ('EMAIL', 'GOOGLE');
ALTER TABLE "users" ALTER COLUMN "auth_provider" TYPE "AuthProvider_new" USING ("auth_provider"::text::"AuthProvider_new");
ALTER TABLE "companies" ALTER COLUMN "auth_provider" TYPE "AuthProvider_new" USING ("auth_provider"::text::"AuthProvider_new");
ALTER TYPE "AuthProvider" RENAME TO "AuthProvider_old";
ALTER TYPE "AuthProvider_new" RENAME TO "AuthProvider";
DROP TYPE "AuthProvider_old";
COMMIT;
