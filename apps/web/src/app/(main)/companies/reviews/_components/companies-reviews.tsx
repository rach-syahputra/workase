'use client';

<<<<<<< HEAD
import { useEffect } from 'react';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
=======
import { useEffect, useState } from 'react';

import { getCompaniesReviews } from '@/lib/apis/company-reviews';
import { ICompanyReview } from '@/lib/interfaces/company-review';
>>>>>>> 80e554f (feat(web): implement search company reviews)
import CompanyReviewCard from '@/components/company/reviews/company-review-card';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';

const CompaniesReviews = () => {
<<<<<<< HEAD
  const { isLoading, reviews, fetchCompaniesReviews } =
    useCompaniesReviewsContext();

  useEffect(() => {
    fetchCompaniesReviews();
=======
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ICompanyReview[]>([]);

  const fetchCompanyReviews = async () => {
    setIsLoading(true);

    const response = await getCompaniesReviews({
      order: 'desc',
    });

    if (response.success) {
      setReviews(response.data?.reviews || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanyReviews();
>>>>>>> 80e554f (feat(web): implement search company reviews)
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
