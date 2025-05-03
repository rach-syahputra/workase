-- CreateTable
CREATE TABLE "company_review_ratings" (
    "id" TEXT NOT NULL,
    "company_review_id" TEXT NOT NULL,
    "overall_rating" INTEGER NOT NULL,
    "work_culture" INTEGER NOT NULL,
    "work_life_balance" INTEGER NOT NULL,
    "facilities" INTEGER NOT NULL,
    "career_growth" INTEGER NOT NULL,

    CONSTRAINT "company_review_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_review_ratings_company_review_id_key" ON "company_review_ratings"("company_review_id");

-- AddForeignKey
ALTER TABLE "company_review_ratings" ADD CONSTRAINT "company_review_ratings_company_review_id_fkey" FOREIGN KEY ("company_review_id") REFERENCES "company_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
