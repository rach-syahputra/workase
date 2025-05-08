'use client';

import { HashLoader } from 'react-spinners';

import { cn } from '@/lib/utils';

type AppLoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

const AppLoading = ({ size = 'sm', label }: AppLoadingProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-2', {
        'gap-3': size === 'lg',
      })}
    >
      <HashLoader
        color="#0066ff"
        loading={true}
        size={size === 'sm' ? 24 : size === 'md' ? 32 : 40}
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

export default AppLoading;
