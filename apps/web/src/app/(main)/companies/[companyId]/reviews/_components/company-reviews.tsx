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

interface IOption {
  isLoadMore: boolean;
}

const CompanyReviews = ({ companyId }: CompanyReviewsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ICompanyReview[]>([]);

  const fetchCompanyReviews = async (option?: IOption) => {
    setIsLoading(true);

    const response = await getCompanyReviews(companyId, {
      cursor,
      limit: 15,
      order: 'desc',
    });

    if (response.success) {
      const newReviews = response.data?.reviews;
      const updatedReviews = option?.isLoadMore
        ? [...reviews, ...(newReviews || [])]
        : newReviews || [];

      setReviews(updatedReviews);
      setCursor(response.data?.pagination.cursor || '');
      setHasMore(
        updatedReviews.length >= (response.data?.pagination.totalData || 0)
          ? false
          : true,
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanyReviews();
  }, [companyId]);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        fetchCompanyReviews({ isLoadMore: true });
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [isLoading, hasMore]);

  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="reviews" className="w-full">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          {reviews.length > 0 && (
            <>
              {reviews.map((review, index) => (
                <CompanyReviewCard key={index} review={review} />
              ))}
            </>
          )}

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

export default CompanyReviews;
