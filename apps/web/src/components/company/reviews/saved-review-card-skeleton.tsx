import { Skeleton } from '@/components/shadcn-ui/skeleton';

const SavedReviewCardSkeleton = () => {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-start gap-2">
      <div className="flex w-full items-center gap-2 p-4">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex w-full flex-col gap-1 p-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
};

export default SavedReviewCardSkeleton;
