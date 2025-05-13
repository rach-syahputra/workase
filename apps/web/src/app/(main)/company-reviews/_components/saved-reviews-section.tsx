'use client';

import { Fragment } from 'react';
import Link from 'next/link';

import { useSavedReviewsContext } from '@/context/saved-reviews-context';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import SavedReviewCard from '@/components/company/reviews/saved-review-card';
import SavedReviewCardSkeleton from '@/components/company/reviews/saved-review-card-skeleton';

interface SavedReviewsSectionProps {
  className?: string;
}

const SavedReviewsSection = ({ className }: SavedReviewsSectionProps) => {
  const { isLoading, savedReviews } = useSavedReviewsContext();

  return (
    <Card className={className}>
      <div className="flex w-full flex-col gap-4">
        <h2 className="p-4 text-sm font-medium">Saved Reviews</h2>
      </div>
      <Separator />
      <div className="flex flex-col">
        {isLoading ? (
          <>
            <SavedReviewCardSkeleton />
            <Separator />
            <SavedReviewCardSkeleton />
          </>
        ) : savedReviews && savedReviews.length > 0 ? (
          savedReviews.slice(0, 2).map((savedReview, index) => (
            <Fragment key={index}>
              <SavedReviewCard savedReview={savedReview} />
              {index !== savedReviews?.length - 1 && <Separator />}
            </Fragment>
          ))
        ) : (
          <p className="text-primary-gray p-4 text-sm">No saved reviews.</p>
        )}
      </div>

      {savedReviews && savedReviews.length > 0 && (
        <>
          <Separator />
          <div className="p-4">
            <Link
              href="/company-reviews/saved"
              aria-label="Saved reviews page"
              className="hover:text-primary-blue text-sm underline"
            >
              See all
            </Link>
          </div>
        </>
      )}
    </Card>
  );
};

export default SavedReviewsSection;
