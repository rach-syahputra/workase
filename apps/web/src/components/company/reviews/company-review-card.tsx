'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkCheck } from '@fortawesome/free-solid-svg-icons';

import { cn, formatCurrency, formatRelativeTime } from '@/lib/utils';
import { ICompanyReview } from '@/lib/interfaces/company-review';
import { Card } from '../../shadcn-ui/card';
import Icon from '../../ui/icon';
import CompanyReviewRating from './company-review-rating';

interface CompanyReviewCardProps {
  review: ICompanyReview;
  onBookmark: () => void;
  disabled?: boolean;
  className?: string;
}

const CompanyReviewCard = ({
  review,
  onBookmark,
  disabled,
  className,
}: CompanyReviewCardProps) => {
  const [isExpandedContent, setIsExpandedContent] = useState<boolean>(false);
  const maxContentLength = 400;

  return (
    <Card
      className={cn(
        'flex w-full flex-col max-md:border-none max-md:shadow-none',
        className,
      )}
    >
      <div className="flex flex-row items-start justify-between">
        <Link
          href={`/companies/${review.companyId}`}
          className="flex items-center justify-center gap-2 p-4"
        >
          <Image
            src={review.companyLogoUrl}
            alt={review.companyName}
            width={200}
            height={200}
            className="w-9 rounded-sm"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{review.companyName}</h3>
            <span className="text-primary-gray text-xs">
              {formatRelativeTime(review.createdAt)}
            </span>
          </div>
        </Link>
        <div className="flex items-center">
          <span className="text-primary-gray text-xs font-medium">
            {review.savedCount}
          </span>
          <button
            type="button"
            disabled={disabled}
            onClick={onBookmark}
            className="flex cursor-pointer items-center justify-center p-4"
          >
            <Icon
              icon={review.saved ? faBookmarkCheck : faBookmark}
              className="text-primary-dark w-2.5"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col px-4">
        <span className="text-primary-gray text-sm">{review.jobTitle}</span>
        <h4 className="text-primary-dark font-semibold">{review.title}</h4>
        <CompanyReviewRating
          rating={{
            overall: review.rating.overallRating,
            workCulture: review.rating.workCulture,
            workLifeBalance: review.rating.workLifeBalance,
            facilities: review.rating.facilities,
            careerGrowth: review.rating.careerGrowth,
          }}
        />
        <p className="text-primary-gray mt-1 text-sm font-medium">
          {formatCurrency(review.salaryEstimate)}
        </p>
      </div>

      <div className="flex flex-col gap-1 p-4">
        <p>
          {isExpandedContent
            ? review.content
            : review.content.slice(0, maxContentLength)}
          {!isExpandedContent && review.content.length > maxContentLength && (
            <>
              ...{' '}
              <button
                onClick={() => setIsExpandedContent(true)}
                className="text-primary-blue"
              >
                See more
              </button>
            </>
          )}
        </p>
      </div>
    </Card>
  );
};

export default CompanyReviewCard;
