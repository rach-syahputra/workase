'use client';

import { Fragment, useEffect } from 'react';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import CompanyReviewCard from '@/components/company/reviews/company-review-card';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import { Separator } from '@/components/shadcn-ui/separator';

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
        <div className="flex w-full flex-col items-center justify-center gap-4">
          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <Fragment key={index}>
                <CompanyReviewCard review={review} />
                {index !== reviews.length - 1 && <Separator />}
              </Fragment>
            ))}

          {isLoading && (
            <>
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
            </>
          )}

          {!isLoading && reviews.length === 0 && (
            <div className="flex w-full items-center justify-center px-4 py-4">
              <p className="text-primary-gray text-center">
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
