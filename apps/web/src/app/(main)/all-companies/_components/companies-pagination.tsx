import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn-ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination as PaginationType } from '@/lib/interfaces/companies';

export default function CompaniesPagination({
  currentPage,
  totalPage,
  hasPreviousPage,
  hasNextPage,
}: PaginationType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/all-companies?${params.toString()}`);
  };

  const generatePaginationItems = () => {
    if (!totalPage || totalPage <= 1) return [1];
    const currentPageNum = currentPage || 1;
    const totalPages = totalPage || 1;
    const items = [];

    items.push(1);

    const leftSide = Math.max(2, currentPageNum - 1);
    const rightSide = Math.min(totalPages - 1, currentPageNum + 1);
    if (leftSide > 2) {
      items.push('ellipsis-left');
    } else if (totalPages >= 2) {
      items.push(2);
    }
    for (
      let i = Math.max(3, leftSide);
      i <= Math.min(totalPages - 2, rightSide);
      i++
    ) {
      items.push(i);
    }
    if (rightSide < totalPages - 1) {
      items.push('ellipsis-right');
    } else if (totalPages > 2 && !items.includes(totalPages - 1)) {
      items.push(totalPages - 1);
    }

    if (totalPages > 1 && !items.includes(totalPages)) {
      items.push(totalPages);
    }
    return items;
  };

  return (
    <div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  hasPreviousPage
                    ? handlePageChange(currentPage - 1)
                    : undefined
                }
                className={
                  !hasPreviousPage
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            {/* Page Number */}
            {generatePaginationItems().map((item, index) => {
              if (item === 'ellipsis-left' || item === 'ellipsis-right') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={`page-${item}-${index}`}>
                  <PaginationLink
                    onClick={() => handlePageChange(item as number)}
                    isActive={currentPage === item}
                    className="cursor-pointer"
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  hasNextPage ? handlePageChange(currentPage + 1) : undefined;
                }}
                className={
                  !hasNextPage
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
