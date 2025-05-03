-- AlterTable
ALTER TABLE "users" ADD COLUMN     "job_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
