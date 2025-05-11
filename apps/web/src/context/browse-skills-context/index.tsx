'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getSkills } from '@/lib/apis/skill';
import { ISkill } from '@/lib/interfaces/skill';
import { IBrowseSkillsContext } from './interface';

const BrowseSkillsContext = createContext<IBrowseSkillsContext | undefined>(
  undefined,
);

const BrowseSkillsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [debouncedSearchSkill, setDebouncedSearchSkill] = useState<string>('');
  const [onRemoveMode, setOnRemoveMode] = useState<boolean>(false);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const limit = 12;

  const fetchSkills = useCallback(async () => {
    setIsLoading(true);

    const response = await getSkills({
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
  }, [page, debouncedSearchSkill]);

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setDebouncedSearchSkill(searchSkill);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchSkill]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <BrowseSkillsContext.Provider
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
        onRemoveMode,
        setOnRemoveMode,
        skills,
        setSkills,
        limit,
        fetchSkills,
      }}
    >
      {children}
    </BrowseSkillsContext.Provider>
  );
};

const useBrowseSkillsContext = (): IBrowseSkillsContext => {
  const context = useContext(BrowseSkillsContext);
  if (context === undefined) {
    throw new Error(
      'useBrowseSkillsContext must be used within a BrowseSkillsProvider',
    );
  }
  return context;
};

export { BrowseSkillsProvider, useBrowseSkillsContext };
