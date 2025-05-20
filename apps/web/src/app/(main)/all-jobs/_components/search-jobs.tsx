'use client';

import * as React from 'react';
import JobCard from '../../_components/card';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn-ui/pagination';
import { JobsResponse } from '@/context/search-job-context';

export function SearchJobs({ pagination, jobs }: JobsResponse) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const generatePaginationItems = () => {
    if (!pagination) return [1];
    const currentPage = pagination.currentPage || 1;
    const totalPages = pagination.totalPage || 1;
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
    return items;
  };

  return (
    <div className="w-full max-w-[90%] pt-[12px] md:pt-0 lg:max-w-[90%]">
      <div className="my-4">
        {jobs && jobs.length > 0 ? (
          <>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  description={job.description || ''}
                  title={job.title || ''}
                  location={job.company?.location || ''}
                  category={job.category || ''}
                  companyName={job.company?.name || ''}
                  createdAt={job.createdAt || ''}
                  logoUrl={job.company?.logoUrl || ''}
                  slug={job.slug || ''}
                />
              ))}
            </div>

            {/* Implementasi pagination dengan shadcn/ui */}
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  {/* Tombol Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        pagination && pagination.currentPage > 1
                          ? handlePageChange(pagination.currentPage - 1)
                          : null
                      }
                      className={
                        pagination && pagination.currentPage <= 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>

                  {/* Nomor halaman */}
                  {generatePaginationItems().map((item, index) => (
                    <PaginationItem key={`page-${item}-${index}`}>
                      <PaginationLink
                        onClick={() => handlePageChange(item)}
                        isActive={
                          pagination
                            ? pagination.currentPage === item
                            : item === 1
                        }
                        className="cursor-pointer"
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* Tombol Next */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        pagination &&
                        pagination.currentPage < pagination.totalPage
                          ? handlePageChange(pagination.currentPage + 1)
                          : null;
                      }}
                      className={
                        pagination && pagination.currentPage > 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="py-40 text-center">
            <p>No jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
