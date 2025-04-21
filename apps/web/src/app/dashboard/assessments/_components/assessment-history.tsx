'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { getUserAssessments } from '@/lib/apis/user-assessment';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import { IUserAssessmentColumn } from './table/interface';
import AppPagination from '@/components/ui/pagination';
import { DataTable } from '@/components/ui/table/data-table';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import { Card } from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import { getAssessmentDiscoveryColumns } from './table/column';

const AssessmentHistory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [enrollmentDateOrder, setEnrollmentDateOrder] =
    useState<OrderType>('desc');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [debouncedSearchSkill, setDebouncedSearchSkill] = useState<string>('');
  const [columns, setColumns] = useState<ColumnDef<IUserAssessmentColumn>[]>(
    [],
  );
  const [tableData, setTableData] = useState<IUserAssessmentColumn[]>([]);

  const fetchGetUserAssessments = async () => {
    setIsLoading(true);

    const response = await getUserAssessments({
      userId: 'ndy-01',
      page,
      limit,
      order: enrollmentDateOrder,
      skill: debouncedSearchSkill,
    });
    const userAssessments = response.data?.userAssessments;
    const pagination = response.data?.pagination;

    if (response.success && userAssessments) {
      setColumns(
        getAssessmentDiscoveryColumns({
          onEnrollmentDateClick: () =>
            setEnrollmentDateOrder(
              enrollmentDateOrder === 'desc' ? 'asc' : 'desc',
            ),
        }),
      );
      setTableData(
        userAssessments.map((userAssessment) => ({
          id: userAssessment.id,
          createdAt: userAssessment.createdAt,
          skill: userAssessment.skill,
          score: userAssessment.score,
          status: userAssessment.status,
          page: page || 1,
          sessionToken: userAssessment.sessionToken,
          certificate: userAssessment.certificate,
        })),
      );
      setPage(pagination?.page || 1);
      setTotalPages(pagination?.totalPages || 0);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchGetUserAssessments();
  }, []);

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setPage(1);
      setDebouncedSearchSkill(searchSkill);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchSkill]);

  useEffect(() => {
    fetchGetUserAssessments();
  }, [debouncedSearchSkill]);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-6 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <UserDashboardHeader
        title="Assessment History"
        description="Review your previously taken assessments and scores."
      />

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
          <DataTable columns={columns} pageSize={8} data={tableData} />
          {totalPages > 1 && (
            <AppPagination
              page={page}
              onPageChange={setPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default AssessmentHistory;
