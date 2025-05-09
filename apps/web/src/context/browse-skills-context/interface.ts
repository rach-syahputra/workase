import { ISkill } from '@/lib/interfaces/skill';
import { Dispatch, SetStateAction } from 'react';

export interface IBrowseSkillsContext {
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
  skills: ISkill[];
  setSkills: Dispatch<SetStateAction<ISkill[]>>;
  limit: number;
  fetchSkills: (page?: number) => void;
}
