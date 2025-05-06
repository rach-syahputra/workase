'use client';

import { Fragment } from 'react';

import { useSavedReviewsContext } from '@/context/saved-reviews-context';
import { Separator } from '@/components/shadcn-ui/separator';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import CompanyReviewCard from '@/components/company/reviews/company-review-card';

const PageContent = () => {
  const { isLoading, savedReviews, handleSavedReview } =
    useSavedReviewsContext();

  return (
    <div className="flex flex-col">
      <h1 className="heading-5 p-4">Saved Company Reviews</h1>
      <Separator />
      <div className="flex flex-col">
        {isLoading ? (
          <>
            <CompanyReviewCardLoading />
            <Separator />
            <CompanyReviewCardLoading />
            <Separator />
            <CompanyReviewCardLoading />
          </>
        ) : savedReviews && savedReviews.length > 0 ? (
          savedReviews.map((savedReview, index) => (
            <Fragment key={index}>
              <div className="p-4">
                <CompanyReviewCard
                  review={savedReview.companyReview}
                  onBookmark={() =>
                    handleSavedReview({
                      companyReviewId: savedReview.companyReview.id,
                      companySlug: savedReview.companyReview.companySlug,
                      action: savedReview.companyReview.saved
                        ? 'REMOVE'
                        : 'ADD',
                    })
                  }
                />
              </div>
              {index !== savedReviews?.length - 1 && <Separator />}
            </Fragment>
          ))
        ) : (
          <p className="text-primary-gray py-8 text-sm">No saved reviews.</p>
        )}
      </div>
    </div>
  );
};

export default PageContent;
