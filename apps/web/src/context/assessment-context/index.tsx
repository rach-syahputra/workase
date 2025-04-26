'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getAssessments } from '@/lib/apis/assessments';
import { IAssessment } from '@/lib/interfaces/assessment';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import { IAssessmentContext } from './interface';

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
  const [assessments, setAssessments] = useState<IAssessment[]>([]);

  const fetchGetAssessments = async () => {
    setIsLoading(true);

    const response = await getAssessments({
      limit,
      page,
      order,
      skill: debouncedSearchSkill,
    });

    if (response.success) {
      setAssessments(
        response.data?.assessments.map((assessment) => assessment) || [],
      );
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setPage(page || 1);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setPage(1);
      setDebouncedSearchSkill(searchSkill);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchSkill]);

  useEffect(() => {
    fetchGetAssessments();
  }, [page, limit, order, debouncedSearchSkill]);

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
        assessments,
        setAssessments,
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
