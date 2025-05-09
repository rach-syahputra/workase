'use client';

import { useEffect, useState } from 'react';
import { useAssessmentContext } from '@/context/assessment-context';
import { DataTable } from '@/components/ui/table/data-table';
import { Input } from '@/components/shadcn-ui/input';
import { Card } from '@/components/shadcn-ui/card';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import AppPagination from '@/components/ui/pagination';

const BrowseAssessments = () => {
  const {
    isLoading,
    searchSkill,
    setSearchSkill,
    page,
    setPage,
    totalPages,
    fetchGetAssessments,
    columns,
    tableData,
  } = useAssessmentContext();

  useEffect(() => {
    fetchGetAssessments();
  }, [fetchGetAssessments]);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 max-md:border-none max-md:shadow-none md:p-5">
      <h2 className="heading-4 font-semibold">Browse Assessment</h2>

      <Input
        type="text"
        placeholder="Search skills..."
        onChange={(e) => setSearchSkill(e.target.value)}
        value={searchSkill}
        className="w-full md:w-1/2"
      />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={columns} pageSize={10} data={tableData} />
          {totalPages > 1 && (
            <AppPagination
              page={page}
              onPageChange={setPage}
              totalPages={totalPages}
              disabled={isLoading}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default BrowseAssessments;
