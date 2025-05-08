'use client';

import { Fragment } from 'react';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import { useSavedReviewsContext } from '@/context/saved-reviews-context';
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

const CompaniesReviews = () => {
  const { isLoading, renderWithQ, reviews } = useCompaniesReviewsContext();
  const { handleSavedReview, isSaving } = useSavedReviewsContext();

  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="reviews" className="w-full">
          Company Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reviews" className="py-0">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-full items-center justify-center px-4 pt-4">
            <SearchCompanyReviewsBar />
          </div>
          {!renderWithQ.current &&
            reviews &&
            reviews?.length > 0 &&
            reviews.map((review, index) => (
              <Fragment key={index}>
                <div className="mt-2 w-full md:mt-0 md:p-4">
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
                </div>
                {index !== reviews.length - 1 && <Separator />}
              </Fragment>
            ))}

          {isLoading && (
            <div className="mt-2 w-full md:mt-0 md:p-4">
              <CompanyReviewCardLoading />
            </div>
          )}

          {!isLoading && (!reviews || reviews.length === 0) && (
            <div className="flex w-full items-center justify-center px-4 py-4">
              <p className="text-primary-gray text-center text-sm">
                There are currently no reviews.
              </p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CompaniesReviews;
