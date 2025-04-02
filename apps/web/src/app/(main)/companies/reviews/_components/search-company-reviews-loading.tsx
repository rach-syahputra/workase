import { Skeleton } from '@/components/shadcn-ui/skeleton';

const SearchCompanyReviewsLoading = () => {
  return (
    <ul className="flex w-full flex-col items-start pb-3">
      <li className="flex h-[52px] w-full items-center justify-start gap-2 px-4 py-2">
        <Skeleton className="aspect-square w-9" />
        <div className="flex h-9 w-full flex-col items-start justify-center gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-10" />
        </div>
      </li>
      <li className="flex h-[52px] w-full items-center justify-start gap-2 px-4 py-2">
        <Skeleton className="aspect-square w-9" />
        <div className="flex h-9 w-full flex-col items-start justify-center gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-10" />
        </div>
      </li>
    </ul>
  );
};

export default SearchCompanyReviewsLoading;
