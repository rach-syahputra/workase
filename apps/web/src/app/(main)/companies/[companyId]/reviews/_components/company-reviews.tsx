'use client';

import { useEffect, useState } from 'react';

import { getCompanyReviews } from '@/lib/apis/company-reviews';
import { ICompanyReview } from '@/lib/interfaces/company-review';
import CompanyReviewCard from '@/components/company/reviews/company-review-card';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';

interface CompanyReviewsProps {
  companyId: string;
}

const CompanyReviews = ({ companyId }: CompanyReviewsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ICompanyReview[]>([]);

  const fetchCompanyReviews = async () => {
    setIsLoading(true);

    const response = await getCompanyReviews(companyId);

    if (response.success) {
      setReviews(response.data?.reviews || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanyReviews();
  }, [companyId]);

  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="reviews" className="w-full">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          {isLoading ? (
            <>
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
              <CompanyReviewCardLoading />
            </>
          ) : reviews.length > 0 ? (
            <>
              {reviews.map((review, index) => (
                <CompanyReviewCard key={index} review={review} />
              ))}
            </>
          ) : (
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

export default CompanyReviews;
