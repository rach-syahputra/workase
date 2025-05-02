'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { IAssessmentColumn } from '@/app/dev/(management)/assessments/_components/table/interface';
import { getAssessments } from '@/lib/apis/assessments';
import { IAssessment } from '@/lib/interfaces/assessment';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import { IAssessmentContext } from './interface';
import { getAssessmentColumns } from '@/app/dev/(management)/assessments/_components/table/column';

const AssessmentContext = createContext<IAssessmentContext | undefined>(
  undefined,
);

const AssessmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [order, setOrder] = useState<OrderType>('desc');
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [debouncedSearchSkill, setDebouncedSearchSkill] = useState<string>('');
  const [columns, setColumns] = useState<ColumnDef<IAssessmentColumn>[]>([]);
  const [tableData, setTableData] = useState<IAssessmentColumn[]>([]);

  const fetchGetAssessments = useCallback(async () => {
    setIsLoading(true);

    const response = await getAssessments({
      limit,
      page,
      order,
      skill: debouncedSearchSkill,
    });

    if (response.success) {
      setColumns(
        getAssessmentColumns({
          onLastUpdatedHeaderClick: () =>
            setOrder(order === 'desc' ? 'asc' : 'desc'),
        }),
      );

      setTableData(
        response.data?.assessments?.map((assesment) => ({
          slug: assesment.slug,
          updatedAt: assesment.updatedAt,
          skill: assesment.skill.title,
          totalQuestions: assesment.totalQuestions || 0,
        })) || [],
      );
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setPage(page || 1);
    }

    setIsLoading(false);
  }, [page, limit, order, debouncedSearchSkill]);

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setPage(1);
      setDebouncedSearchSkill(searchSkill);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchSkill]);

  useEffect(() => {
    fetchGetAssessments();
  }, [fetchGetAssessments]);

  return (
    <AssessmentContext.Provider
      value={{
        isLoading,
        setIsLoading,
        totalPages,
        setTotalPages,
        page,
        setPage,
        limit,
        setLimit,
        order,
        setOrder,
        searchSkill,
        setSearchSkill,
        debouncedSearchSkill,
        setDebouncedSearchSkill,
        columns,
        setColumns,
        tableData,
        setTableData,
        fetchGetAssessments,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

const useAssessmentContext = (): IAssessmentContext => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error(
      'useAssessmentContext must be used within a AssessmentProvider',
    );
  }
  return context;
};

export { AssessmentProvider, useAssessmentContext };
