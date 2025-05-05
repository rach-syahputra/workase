import Image from 'next/image';

import { ISavedReview } from '@/lib/interfaces/company-review';
import { cn } from '@/lib/utils';

interface SavedReviewCardProps {
  savedReview: ISavedReview;
  className?: string;
}

const SavedReviewCard = ({ savedReview, className }: SavedReviewCardProps) => {
  return (
    <div className={cn('flex flex-col gap-2 p-4', className)}>
      <div className="flex items-center gap-2">
        {savedReview.companyReview.companyLogoUrl ? (
          <Image
            src={savedReview.companyReview.companyLogoUrl}
            alt={savedReview.companyReview.companyName}
            width={100}
            height={100}
            className="aspect-square w-5 rounded-md object-cover"
          />
        ) : (
          <div className="aspect-square w-5 rounded-md bg-gray-200"></div>
        )}
        <span className="text-sm font-medium">
          {savedReview.companyReview.companyName}
        </span>
      </div>
      <p className="text-sm">
        {savedReview.companyReview.content.slice(0, 100)}
        {savedReview.companyReview.content.length > 100 && '...'}
      </p>
    </div>
  );
};

export default SavedReviewCard;
