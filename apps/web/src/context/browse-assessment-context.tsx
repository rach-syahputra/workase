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
import { IAssessmentColumn } from '@/app/dev/(management)/assessments/_components/table/column';

interface IBrowseAssessmentContext {
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
  assessments: IAssessmentColumn[];
  setAssessments: Dispatch<SetStateAction<IAssessmentColumn[]>>;
  limit: number;
  fetchAssessments: (page?: number) => void;
}

const BrowseAssessmentContext = createContext<
  IBrowseAssessmentContext | undefined
>(undefined);

const BrowseAssessmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    <BrowseAssessmentContext.Provider
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
        limit,
      }}
    >
      {children}
    </BrowseAssessmentContext.Provider>
  );
};

const useBrowseAssessmentContext = (): IBrowseAssessmentContext => {
  const context = useContext(BrowseAssessmentContext);
  if (context === undefined) {
    throw new Error(
      'useBrowseAssessmentContext must be used within a BrowseAssessmentProvider',
    );
  }
  return context;
};

export { BrowseAssessmentProvider, useBrowseAssessmentContext };
