-- DropForeignKey
ALTER TABLE "assesment_questions" DROP CONSTRAINT "assesment_questions_assesment_id_fkey";

-- DropForeignKey
ALTER TABLE "company_review_ratings" DROP CONSTRAINT "company_review_ratings_company_review_id_fkey";

-- DropForeignKey
ALTER TABLE "question_options" DROP CONSTRAINT "question_options_assesment_question_id_fkey";

-- AddForeignKey
ALTER TABLE "company_review_ratings" ADD CONSTRAINT "company_review_ratings_company_review_id_fkey" FOREIGN KEY ("company_review_id") REFERENCES "company_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assesment_questions" ADD CONSTRAINT "assesment_questions_assesment_id_fkey" FOREIGN KEY ("assesment_id") REFERENCES "assesments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_assesment_question_id_fkey" FOREIGN KEY ("assesment_question_id") REFERENCES "assesment_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
