import { Skeleton } from '@/components/shadcn-ui/skeleton';

const AvailableSkillCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <Skeleton className="h-5 w-1/2 md:w-1/4" />
      <Skeleton className="h-9 w-full md:w-1/4" />
    </div>
  );
};

export default AvailableSkillCardSkeleton;
