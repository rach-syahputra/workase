import { faStar } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import { Label } from '../shadcn-ui/label';
import Icon from './icon';

interface RatingFormInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  errorMessage?: string;
}

const RatingFormInput: React.FC<RatingFormInputProps> = ({
  label,
  name,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <div id={name} className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} stars`}
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Icon
              icon={faStar}
              className={cn('w-4 text-gray-300', {
                'fill-yellow-400 text-yellow-400': star <= value,
              })}
            />
          </button>
        ))}
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default RatingFormInput;
