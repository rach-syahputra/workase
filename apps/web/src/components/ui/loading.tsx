import { HashLoader } from 'react-spinners';

import { cn } from '@/lib/utils';

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

const Loading = ({ size = 'sm', label }: LoadingProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-2', {
        'gap-3': size === 'lg',
      })}
    >
      <HashLoader
        color="#0066ff"
        size={size === 'sm' ? 24 : size === 'md' ? 40 : 58}
      />

      {label && (
        <span
          className={cn({
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
          })}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Loading;
