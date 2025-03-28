import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import Icon from './icon';

interface RatingProps {
  label?: string;
  value: number;
  size?: number;
  className?: string;
}

const Rating = ({ label, value, size = 16, className }: RatingProps) => {
  return (
    <div className={cn('flex w-fit select-none items-center gap-2', className)}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = star <= value;
          const isHalf = star - 1 < value && value < star;

          return (
            <div
              key={star}
              aria-label={`Rate ${star} stars`}
              className="focus:outline-none"
            >
              {isFull ? (
                <Icon
                  icon={faStar}
                  className="w-4 fill-yellow-400 text-yellow-400"
                />
              ) : isHalf ? (
                <Icon
                  icon={faStarHalfStroke}
                  className="w-4 fill-yellow-400 text-yellow-400"
                />
              ) : (
                <Icon icon={faStar} className="w-4 text-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
