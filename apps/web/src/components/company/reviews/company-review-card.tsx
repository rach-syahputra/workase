import Image from 'next/image';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { cn, formatRelativeTime } from '@/lib/utils';
import { ICompanyReview } from '@/lib/interfaces/company-review';
import { Card } from '../../shadcn-ui/card';
import Icon from '../../ui/icon';
import CompanyReviewRating from './company-review-rating';

interface CompanyReviewCardProps {
  review: ICompanyReview;
  className?: string;
}

const CompanyReviewCard = ({ review, className }: CompanyReviewCardProps) => {
  return (
    <Card className={cn('flex w-full flex-col gap-2 p-4', className)}>
      <div className="flex flex-row items-start justify-between">
        <div className="flex items-center justify-center gap-2">
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
        </div>
        {/* TO DO: do something on ellipsis icon */}
        <Icon
          icon={faEllipsis}
          className="text-primary-dark w-3.5 cursor-pointer"
        />
      </div>

      <div className="flex flex-col">
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
      </div>
      <div className="flex flex-col gap-1">
        <p>{review.content}</p>
      </div>
    </Card>
  );
};

export default CompanyReviewCard;
