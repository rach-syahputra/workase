'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAvailableSkills } from '@/lib/apis/assessments';
import { ISkill } from '@/lib/interfaces/skill';

interface ICreateAssessmentContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  searchSkill: string;
  setSearchSkill: Dispatch<SetStateAction<string>>;
  debouncedSearchSkill: string;
  setDebouncedSearchSkill: Dispatch<SetStateAction<string>>;
  skills: ISkill[];
  setSkills: Dispatch<SetStateAction<ISkill[]>>;
  selectedSkillId: string;
  setSelectedSkillId: Dispatch<SetStateAction<string>>;
  limit: number;
  fetchSkills: () => void;
}

const CreateAssessmentContext = createContext<
  ICreateAssessmentContext | undefined
>(undefined);

const CreateAssessmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [debouncedSearchSkill, setDebouncedSearchSkill] = useState<string>('');
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');
  const limit = 5;

  const fetchSkills = async (page?: number) => {
    setIsLoading(true);

    const response = await getAvailableSkills({
      limit,
      page: page || 1,
      title: debouncedSearchSkill,
    });

    console.log(response);

    if (response.success) {
      setSkills(response.data?.skills || []);
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

  useEffect(() => {
    fetchSkills(page);
  }, [debouncedSearchSkill]);

  return (
    <CreateAssessmentContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isSubmitting,
        setIsSubmitting,
        totalPages,
        setTotalPages,
        page,
        setPage,
        searchSkill,
        setSearchSkill,
        debouncedSearchSkill,
        setDebouncedSearchSkill,
        skills,
        setSkills,
        limit,
        selectedSkillId,
        setSelectedSkillId,
        fetchSkills,
      }}
    >
      {children}
    </CreateAssessmentContext.Provider>
  );
};

const useCreateAssessmentContext = (): ICreateAssessmentContext => {
  const context = useContext(CreateAssessmentContext);
  if (context === undefined) {
    throw new Error(
      'useCreateAssessmentContext must be used within a CreateAssessmentProvider',
    );
  }
  return context;
};

export { CreateAssessmentProvider, useCreateAssessmentContext };
