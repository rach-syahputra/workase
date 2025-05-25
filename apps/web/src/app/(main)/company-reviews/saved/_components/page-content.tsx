'use client';

import { Fragment } from 'react';

import { useSavedReviewsContext } from '@/context/saved-reviews-context';
import { Separator } from '@/components/shadcn-ui/separator';
import CompanyReviewCardLoading from '@/components/company/reviews/company-review-card-loading';
import CompanyReviewCard from '@/components/company/reviews/company-review-card';
import AppPagination from '@/components/ui/pagination';
import SearchCompanyReviewsBar from './search-company-reviews-bar';

const PageContent = () => {
  const {
    isLoading,
    isSaving,
    totalPages,
    page,
    setPage,
    savedReviews,
    handleSavedReview,
  } = useSavedReviewsContext();

  return (
    <div className="flex flex-col max-md:min-h-[calc(100svh-132px)]">
      <h1 className="heading-5 p-4">Saved Company Reviews</h1>
      <Separator />
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-center px-4 pt-4">
          <SearchCompanyReviewsBar />
        </div>
        {isLoading ? (
          <div className="p-4">
            <CompanyReviewCardLoading />
          </div>
        ) : savedReviews && savedReviews.length > 0 ? (
          savedReviews.map((savedReview, index) => (
            <Fragment key={index}>
              <div className="py-4 md:p-4">
                <CompanyReviewCard
                  review={savedReview.companyReview}
                  disabled={isSaving}
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
          <div className="flex w-full items-center justify-center px-4 py-8">
            <p className="text-primary-gray text-center">No saved reviews.</p>
          </div>
        )}
        {totalPages > 1 && (
          <AppPagination
            page={page}
            onPageChange={setPage}
            disabled={isLoading}
            totalPages={totalPages}
            className="mb-4"
          />
        )}
      </div>
    </div>
  );
};

export default PageContent;
