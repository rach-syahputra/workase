'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getAssessments } from '@/lib/apis/assessments';
import { IAssessment } from '@/lib/interfaces/assessment';

interface IAssessmentContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  searchSkill: string;
  setSearchSkill: Dispatch<SetStateAction<string>>;
  debouncedSearchSkill: string;
  setDebouncedSearchSkill: Dispatch<SetStateAction<string>>;
  assessments: IAssessment[];
  setAssessments: Dispatch<SetStateAction<IAssessment[]>>;
  fetchAssessments: (page?: number, limit?: number) => void;
}

const AssessmentContext = createContext<IAssessmentContext | undefined>(
  undefined,
);

const AssessmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [debouncedSearchSkill, setDebouncedSearchSkill] = useState<string>('');
  const [assessments, setAssessments] = useState<IAssessment[]>([]);

  const fetchAssessments = async (page?: number, limit?: number) => {
    setIsLoading(true);

    const response = await getAssessments({
      limit: limit || 9,
      page: page || 1,
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
      setDebouncedSearchSkill(searchSkill);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchSkill]);

  return (
    <AssessmentContext.Provider
      value={{
        isLoading,
        setIsLoading,
        totalPages,
        setTotalPages,
        page,
        setPage,
        searchSkill,
        setSearchSkill,
        debouncedSearchSkill,
        setDebouncedSearchSkill,
        assessments,
        setAssessments,
        fetchAssessments,
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
