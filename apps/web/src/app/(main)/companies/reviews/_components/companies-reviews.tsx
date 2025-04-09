'use client';

import { useEffect } from 'react';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import CompanyReviewCard from '@/components/company/reviews/company-review-card';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';

const CompaniesReviews = () => {
  const { isLoading, reviews, fetchCompaniesReviews } =
    useCompaniesReviewsContext();

  useEffect(() => {
    fetchCompaniesReviews();
  }, []);

  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="reviews" className="w-full">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <div className="flex flex-col items-center justify-center w-full gap-4">
<<<<<<< HEAD
          {reviews.length > 0 && (
=======
          {isLoading ? (
            <>
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
            </>
          ) : reviews.length > 0 ? (
>>>>>>> 80e554f (feat(web): implement search company reviews)
            <>
              {reviews.map((review, index) => (
                <CompanyReviewCard key={index} review={review} />
              ))}
            </>
<<<<<<< HEAD
          )}

          {isLoading && (
            <>
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
            </>
          )}

          {!isLoading && reviews.length === 0 && (
=======
          ) : (
>>>>>>> 80e554f (feat(web): implement search company reviews)
            <div className="flex items-center justify-center w-full px-4 py-4">
              <p className="text-center text-primary-gray">
                There are currently no reviews for this company.
              </p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CompaniesReviews;
