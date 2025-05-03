import { Skeleton } from '@/components/shadcn-ui/skeleton';

interface UserDashboardHeaderProps {
  title: string;
  description: string;
  isLoading?: boolean;
}

const UserDashboardHeader = ({
  title,
  description,
  isLoading,
}: UserDashboardHeaderProps) => {
  return isLoading ? (
    <UserDashboardHeaderSkeleton />
  ) : (
    <div className="flex w-full flex-col">
      <h1 className="heading-2">{title}</h1>
      <p className="text-primary-gray text-sm">{description}</p>
    </div>
  );
};

const UserDashboardHeaderSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-7 w-1/2 md:w-1/4" />
      <Skeleton className="h-4 w-2/3 md:w-5/12" />
    </div>
  );
};

export default UserDashboardHeader;
