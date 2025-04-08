import { Skeleton } from '@/components/shadcn-ui/skeleton';

interface DeveloperHeaderProps {
  title: string;
  description: string;
  isLoading?: boolean;
}

const DeveloperHeader = ({
  title,
  description,
  isLoading,
}: DeveloperHeaderProps) => {
  return isLoading ? (
    <DeveloperHeaderSkeleton />
  ) : (
    <div className="flex w-full flex-col">
      <h1 className="heading-2">{title}</h1>
      <p className="text-primary-gray text-sm">{description}</p>
    </div>
  );
};

const DeveloperHeaderSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-7 w-1/2 md:w-1/4" />
      <Skeleton className="h-4 w-2/3 md:w-5/12" />
    </div>
  );
};

export default DeveloperHeader;
