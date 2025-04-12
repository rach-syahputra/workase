import { cn } from '@/lib/utils';

interface UserDashboardContainerProps {
  children: React.ReactNode;
  className?: string;
}

const UserDashboardContainer: React.FC<UserDashboardContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex max-w-screen-xl flex-1 flex-col gap-4 rounded-md border px-4 py-4 md:px-8 md:py-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default UserDashboardContainer;
