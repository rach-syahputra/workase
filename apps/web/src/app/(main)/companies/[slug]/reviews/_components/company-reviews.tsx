'use client';

import { Fragment } from 'react';

import { useCompanyReviewsContext } from '@/context/company-reviews-context';
import CompanyReviewCard from '@/components/company/reviews/company-review-card';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import { Separator } from '@/components/shadcn-ui/separator';
import SearchCompanyReviewsBar from './search-company-reviews-bar';

const CompanyReviews = () => {
  const { isLoading, isSaving, reviews, renderWithQ, handleSavedReview } =
    useCompanyReviewsContext();

  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="reviews" className="w-full">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <div className="flex w-full flex-col items-center justify-center gap-2 md:gap-4">
          <div className="flex w-full items-center justify-center">
            <SearchCompanyReviewsBar />
          </div>
          {!renderWithQ.current &&
            reviews &&
            reviews.length > 0 &&
            reviews.map((review, index) => (
              <Fragment key={index}>
                <CompanyReviewCard
                  review={review}
                  disabled={isSaving}
                  onBookmark={() =>
                    handleSavedReview({
                      companyReviewId: review.id,
                      companySlug: review.companySlug,
                      action: review.saved ? 'REMOVE' : 'ADD',
                    })
                  }
                />
                {index !== reviews.length - 1 && <Separator />}
              </Fragment>
            ))}

          {isLoading && <CompanyReviewCardLoading />}

          {!isLoading && (!reviews || reviews.length === 0) && (
            <div className="flex w-full items-center justify-center px-4 py-4">
              <p className="text-primary-gray text-center text-sm">
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
