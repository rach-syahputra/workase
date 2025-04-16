/*
  Warnings:

  - You are about to drop the column `auth_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth_id",
ADD COLUMN     "skill_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
