import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import Icon from './icon';

interface RatingProps {
  label?: string;
  value: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showValue?: boolean;
  className?: string;
}

const Rating = ({
  label,
  value,
  size = 'md',
  showValue,
  className,
}: RatingProps) => {
  const starWidth =
    size === 'sm'
      ? 'w-3'
      : size === 'md'
        ? 'w-4'
        : size === 'lg'
          ? 'w-5'
          : size === 'xl'
            ? 'w-7'
            : 'w-4';

  const valueFontSize =
    size === 'sm'
      ? 'text-[13px]'
      : size === 'md'
        ? 'text-sm'
        : size === 'lg'
          ? 'text-md'
          : size === 'xl'
            ? 'text-base'
            : 'text-sm';

  return (
    <div className={cn('flex w-fit select-none items-center gap-4', className)}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="flex items-center justify-start gap-1">
        {showValue && (
          <span className={`${valueFontSize} mr-0.5`}>{value}</span>
        )}
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
                  className={`${starWidth} fill-yellow-400 text-yellow-400`}
                />
              ) : isHalf ? (
                <Icon
                  icon={faStarHalfStroke}
                  className={`${starWidth} fill-yellow-400 text-yellow-400`}
                />
              ) : (
                <Icon
                  icon={faStar}
                  className={`${starWidth} w-4 text-gray-300`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
