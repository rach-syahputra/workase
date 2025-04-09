'use client';

import { useEffect, useState } from 'react';

import { getAssessments } from '@/lib/apis/assessments';
import { DataTable } from '@/components/ui/table/data-table';
import { Input } from '@/components/shadcn-ui/input';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import { Card } from '@/components/shadcn-ui/card';
import AppPagination from '@/components/ui/pagination';
import { columns, IAssessmentColumn } from './table/column';

const BrowseAssessments = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [debouncedSearchSkill, setDebouncedSearchSkill] = useState<string>('');
  const [assessments, setAssessments] = useState<IAssessmentColumn[]>([]);
  const limit = 10;

  const fetchAssessments = async (page?: number) => {
    setIsLoading(true);

    const response = await getAssessments({
      limit,
      page: page || 1,
      skill: debouncedSearchSkill,
    });

    if (response.success) {
      setAssessments(
        response.data?.assessments.map((assessment) => ({
          id: assessment.id,
          skill: assessment.skill.title,
          totalQuestions: assessment.totalQuestions || 0,
          updatedAt: assessment.updatedAt,
        })) || [],
      );
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setPage(page || 1);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setDebouncedSearchSkill(searchSkill);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchSkill]);

  useEffect(() => {
    fetchAssessments(page);
  }, [debouncedSearchSkill]);

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
          {assessments?.length > 0 && (
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
