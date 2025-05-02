-- CreateTable
CREATE TABLE "saved_reviews" (
    "user_id" TEXT NOT NULL,
    "company_review_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saved_reviews_pkey" PRIMARY KEY ("user_id","company_review_id")
);

-- AddForeignKey
ALTER TABLE "saved_reviews" ADD CONSTRAINT "saved_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_reviews" ADD CONSTRAINT "saved_reviews_company_review_id_fkey" FOREIGN KEY ("company_review_id") REFERENCES "company_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
