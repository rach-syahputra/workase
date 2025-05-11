'use client';

import { useCallback, useEffect } from 'react';

import { deleteAssessment } from '@/lib/apis/assessments';
import { useToast } from '@/hooks/use-toast';
import { useAssessmentContext } from '@/context/assessment-context';
import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { DataTable } from '@/components/ui/table/data-table';
import { Input } from '@/components/shadcn-ui/input';
import { Card } from '@/components/shadcn-ui/card';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import AppPagination from '@/components/ui/pagination';
import { getAssessmentColumns } from './table/column';

const BrowseAssessments = () => {
  const { toast } = useToast();
  const { fetchSkills } = useBrowseSkillsContext();
  const { fetchAvailableSkills } = useCreateAssessmentContext();
  const {
    isLoading,
    setIsLoading,
    searchSkill,
    setSearchSkill,
    page,
    setPage,
    totalPages,
    order,
    setOrder,
    fetchGetAssessments,
    columns,
    setColumns,
    tableData,
  } = useAssessmentContext();

  const handleDeleteAssessment = useCallback(
    async (assessmentId: string) => {
      setIsLoading(true);

      const response = await deleteAssessment({ assessmentId });

      if (response.success) {
        toast({
          title: 'Assessment Deleted',
          description: 'Assessment deleted successfully.',
        });

        fetchGetAssessments();
        fetchSkills();
        fetchAvailableSkills();
      }

      setIsLoading(false);
    },
    [
      toast,
      setIsLoading,
      fetchGetAssessments,
      fetchSkills,
      fetchAvailableSkills,
    ],
  );

  const initiateColumns = useCallback(() => {
    setColumns(
      getAssessmentColumns({
        onLastUpdatedHeaderClick: () =>
          setOrder(order === 'desc' ? 'asc' : 'desc'),
        onDeleteAssessment: handleDeleteAssessment,
      }),
    );
  }, [handleDeleteAssessment, order, setOrder, setColumns]);

  useEffect(() => {
    fetchGetAssessments();
    initiateColumns();
  }, [fetchGetAssessments, initiateColumns]);

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
