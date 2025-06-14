'use client';

import { Fragment } from 'react';

import { useCompanyReviewsContext } from '@/context/company-reviews-context';
import CompanyReviewCard from '@/components/company/reviews/company-review-card';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import { Separator } from '@/components/shadcn-ui/separator';
import SearchCompanyReviewsBar from './search-company-reviews-bar';

const CompanyReviewsList = () => {
  const { isLoading, isSaving, reviews, renderWithQ, handleSavedReview } =
    useCompanyReviewsContext();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 md:gap-4">
      <div className="flex w-full items-center justify-center px-4 md:px-0">
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

      {isLoading && (
        <div className="flex w-full flex-col gap-4">
          <Separator />
          <CompanyReviewCardLoading />
        </div>
      )}

      {!isLoading && (!reviews || reviews.length === 0) && (
        <div className="flex w-full items-center justify-center px-4 py-4">
          <p className="text-primary-gray text-center text-sm">
            There are currently no reviews for this company.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyReviewsList;
