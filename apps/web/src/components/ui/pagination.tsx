import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/shadcn-ui/pagination';

interface AppPaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  disabled?: boolean;
  className?: string;
}

interface PaginationPreviousProps {
  page: number;
  onPageChange: (page: number) => void;
  disabled: boolean;
}

interface PaginationNextProps {
  page: number;
  onPageChange: (page: number) => void;
  disabled: boolean;
}

const AppPagination = ({
  page,
  onPageChange,
  totalPages,
  disabled,
  className,
}: AppPaginationProps) => {
  return (
    <Pagination className={cn('text-primary-dark', className)}>
      <PaginationContent>
        <PaginationPrevious
          page={page}
          onPageChange={onPageChange}
          disabled={page === 1}
        />
        {Array.from({ length: totalPages >= 5 ? 5 : totalPages }).map(
          (_, index) => {
            let startPage = 1;

            if (totalPages > 5 && page > 2 && page < totalPages - 2) {
              startPage = page - 2; // Keep active page in the middle
            } else if (totalPages > 5 && page >= totalPages - 2) {
              startPage = totalPages - 4; // Adjust for last pages
            }

            const displayedPage = startPage + index;
            const isActive = page === displayedPage;

            return (
              <PaginationItem
                key={index}
                onClick={
                  disabled ? () => {} : () => onPageChange(displayedPage)
                }
                className={cn(
                  'border-primary-gray flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-md border text-sm',
                  {
                    'bg-primary-blue border-white text-white': isActive,
                  },
                )}
              >
                {displayedPage}
              </PaginationItem>
            );
          },
        )}
        <PaginationNext
          page={page}
          onPageChange={onPageChange}
          disabled={page === totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
};

const PaginationPrevious = ({
  page,
  onPageChange,
  disabled,
}: PaginationPreviousProps) => {
  return (
    <PaginationItem
      onClick={() => onPageChange(page - 1)}
      className={cn('flex h-8 w-8 cursor-pointer items-center justify-center', {
        'text-primary-gray pointer-events-none': disabled,
      })}
    >
      <ChevronLeft size={18} />
    </PaginationItem>
  );
};

const PaginationNext = ({
  page,
  onPageChange,
  disabled,
}: PaginationNextProps) => {
  return (
    <PaginationItem
      onClick={() => onPageChange(page + 1)}
      className={cn('flex h-8 w-8 cursor-pointer items-center justify-center', {
        'text-primary-gray pointer-events-none': disabled,
      })}
    >
      <ChevronRight size={18} />
    </PaginationItem>
  );
};

export default AppPagination;
