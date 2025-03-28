'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import Icon from '../ui/icon';
import { Skeleton } from '../shadcn-ui/skeleton';
import { Button } from '../shadcn-ui/button';

interface DetailPageHeaderProps {
  href: string;
  label: string;
  image: string;
  className?: string;
}

interface DetailPageHeaderLoadingProps {
  href: string;
  className?: string;
}

const DetailPageHeader = ({
  href,
  label,
  image,
  className,
}: DetailPageHeaderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (label && image) {
      setIsLoading(false);
    }
  }, [label, image]);

  return isLoading ? (
    <DetailPageHeaderLoading href={href} className={className} />
  ) : (
    <div
      className={cn(
        'sticky top-0 z-50 flex w-full items-center justify-center border-b border-gray-200 bg-white px-1 py-2 md:px-0',
        className,
      )}
    >
      <div className="flex w-full max-w-screen-md items-center justify-start gap-2">
        <Button variant="ghost" asChild className="px-3 py-1">
          <Link
            href={href}
            aria-label={label}
            className="flex items-center justify-center gap-2"
          >
            <Icon icon={faArrowLeft} className="w-4" />
          </Link>
        </Button>
        <div className="flex items-center justify-center gap-2">
          <Image
            src={image}
            alt={label}
            width={100}
            height={100}
            className="aspect-square w-7 rounded-md"
          />
          <h1 className="text-lg font-semibold">{label}</h1>
        </div>
      </div>
    </div>
  );
};

const DetailPageHeaderLoading = ({
  href,
  className,
}: DetailPageHeaderLoadingProps) => {
  return (
    <div
      className={cn(
        'sticky top-0 flex min-h-9 w-full items-center justify-center bg-white px-1 py-2 md:px-0',
        className,
      )}
    >
      <div className="flex w-full max-w-screen-md items-center justify-start gap-2">
        <Button variant="ghost" asChild className="px-3 py-1">
          <Link
            href={href}
            aria-label="Company reviews"
            className="flex items-center justify-center gap-2"
          >
            <Icon icon={faArrowLeft} className="w-4" />
          </Link>
        </Button>
        <div className="flex h-full w-3/4 items-center justify-center gap-2 md:w-1/3">
          <Skeleton className="aspect-square h-7 w-7" />
          <Skeleton className="h-7 w-full" />
        </div>
      </div>
    </div>
  );
};

export { DetailPageHeader, DetailPageHeaderLoading };
