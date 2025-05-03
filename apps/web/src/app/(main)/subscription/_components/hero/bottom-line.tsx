import { cn } from '@/lib/utils';

interface BottomLineProps {
  isActive?: boolean;
  className?: string;
}

const BottomLine = ({ isActive, className }: BottomLineProps) => {
  return (
    <div className={cn('relative h-[76px] w-[63px]', className)}>
      <div
        className={cn(
          'border-border absolute left-0 top-0 h-0.5 w-8 self-end rounded-full border-b-2 border-dashed transition-all duration-300 ease-in-out',
          {
            'border-primary-blue': isActive,
          },
        )}
      />
      <div
        className={cn(
          'border-border absolute left-[30px] top-0 h-[76px] w-0.5 rounded-full border-l-2 border-dashed transition-all duration-300 ease-in-out',
          {
            'border-primary-blue': isActive,
          },
        )}
      />
      <div
        className={cn(
          'border-border absolute bottom-0 left-[31px] h-0.5 w-8 rounded-full border-b-2 border-dashed transition-all duration-300 ease-in-out',
          {
            'border-primary-blue': isActive,
          },
        )}
      />
    </div>
  );
};

export default BottomLine;
