'use client';

import { useBrowseAssessmentContext } from '@/context/browse-assessment-context';
import { DataTable } from '@/components/ui/table/data-table';
import { Input } from '@/components/shadcn-ui/input';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import { Card } from '@/components/shadcn-ui/card';
import AppPagination from '@/components/ui/pagination';
import { columns } from './table/column';

const BrowseAssessments = () => {
  const {
    isLoading,
    searchSkill,
    setSearchSkill,
    page,
    totalPages,
    limit,
    fetchAssessments,
    assessments,
  } = useBrowseAssessmentContext();

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 md:p-5">
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
          <DataTable columns={columns} pageSize={limit} data={assessments} />
          {assessments?.length > 0 && totalPages > 1 && (
            <AppPagination
              page={page}
              onPageChange={fetchAssessments}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default BrowseAssessments;
