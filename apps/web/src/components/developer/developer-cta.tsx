import Link from 'next/link';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import Icon from '@/components/ui/icon';
import { Skeleton } from '../shadcn-ui/skeleton';

interface DeveloperCTAProps {
  label: string;
  description?: string;
  href: string;
  isLoading?: boolean;
  className?: string;
}

const DeveloperCTA = ({
  label,
  description,
  href,
  isLoading,
  className,
}: DeveloperCTAProps) => {
  return isLoading ? (
    <DeveloperCTASkeleton />
  ) : (
    <div className={cn('flex flex-col gap-2', className)}>
      <Button
        variant="dark"
        asChild
        className="hover:bg-primary-blue group h-10 text-base tracking-wide transition-all duration-300 ease-in-out sm:w-fit"
      >
        <Link href={href} aria-label={label}>
          <div className="relative flex h-full w-fit items-center justify-center pr-6">
            {label}
            <Icon
              icon={faArrowRight}
              className="absolute right-0 transition-all duration-300 ease-in-out group-hover:-right-0.5"
            />
          </div>
        </Link>
      </Button>
      {description && (
        <p className="text-primary-gray text-sm">{description}</p>
      )}
    </div>
  );
};

const DeveloperCTASkeleton = () => {
  return <Skeleton className="h-10 w-full md:w-40" />;
};

export default DeveloperCTA;
