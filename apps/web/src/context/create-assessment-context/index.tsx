'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getAvailableSkills } from '@/lib/apis/assessments';
import { ISkill } from '@/lib/interfaces/skill';
import { ICreateAssessmentContext, ISelectedSkill } from './interface';

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
  const [selectedSkill, setSelectedSkill] = useState<ISelectedSkill>({
    id: '',
    title: '',
  });
  const limit = 5;

  const fetchAvailableSkills = async () => {
    setIsLoading(true);

    const response = await getAvailableSkills({
      limit,
      page,
      title: debouncedSearchSkill,
    });

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
    fetchAvailableSkills();
  }, [page, debouncedSearchSkill]);

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
        selectedSkill,
        setSelectedSkill,
        fetchAvailableSkills,
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
