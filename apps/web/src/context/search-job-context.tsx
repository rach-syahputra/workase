'use client';
import { axiosPublic } from '@/lib/axios';
import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
export interface Job {
  createdAt: any;
  description: string;
  company: any;
  id: string;
  title: string;
  category: string;
  location: string;
}

interface ISearchJobContextType {
  jobs: Job[];
  fetchJobs: (filters: {
    title: string;
    category: string;
    location: string;
  }) => Promise<void>;
}

const SearchJobContext = createContext<ISearchJobContextType | undefined>(
  undefined,
);
export function SearchJobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = React.useCallback(
    async (filters: {
      title?: string;
      category?: string;
      location?: string;
    }) => {
      try {
        const filter: { title?: string; category?: string; location?: string } =
          {};
        if (filters.title) {
          filter.title = filters.title;
        }
        if (filters.category) {
          filter.category = filters.category;
        }
        if (filters.location) {
          filter.location = filters.location;
        }

        const params: any = {
          limit: 12,
          sort: 'desc',
          ...filter,
        };
        const response = await axiosPublic.get(`/jobs`, {
          params,
        });
        const data = response.data as { data: Job[] };
        setJobs(data.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    },
    [],
  );

  return (
    <SearchJobContext.Provider
      value={{
        jobs,
        fetchJobs,
      }}
    >
      {children}
    </SearchJobContext.Provider>
  );
}

export const useSearchJob = () => {
  const context = useContext(SearchJobContext);
  if (context === undefined) {
    throw new Error('useSearchJob must be used within a SearchJobProvider');
  }
  return context;
};
