import { cn } from '@/lib/utils';

interface DeveloperContainerProps {
  children: React.ReactNode;
  className?: string;
}

const DeveloperContainer: React.FC<DeveloperContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-4 md:px-8 md:py-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DeveloperContainer;
