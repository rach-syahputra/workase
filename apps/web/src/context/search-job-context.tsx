'use client';
import { axiosPublic } from '@/lib/axios';
import * as React from 'react';
import { createContext, useContext, useState } from 'react';

// Interface untuk item Job individual
export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  createdAt: string;
  company: {
    name: string;
    location: string;
    logoUrl: string;
  };
}

// Interface untuk pagination
export interface Pagination {
  currentPage: number;
  totalPage: number;
hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalItem: number;

}

// Interface untuk respons API
export interface JobsResponse {
  jobs: Job[];
  pagination: Pagination;
}

type DateFilterType = '1day' | '7days' | '1month' | 'custom' | null;
type SortOrder = 'desc' | 'asc';

interface ISearchJobContextType {
  jobs: Job[]; // Array Job yang akan digunakan di komponen
  pagination: Pagination | null; // Data pagination
  fetchJobs: (filters: {
    title?: string;
    category?: string;
    location?: string;
    dateFilter?: DateFilterType;
    startDate?: Date | null;
    endDate?: Date | null;
    sortOrder?: SortOrder;
    page?: number;
  }) => Promise<void>;
}

const SearchJobContext = createContext<ISearchJobContextType | undefined>(
  undefined,
);

export function SearchJobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

<<<<<<< HEAD
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
=======
  const fetchJobs = async (filters: {
    title?: string;
    category?: string;
    location?: string;
    dateFilter?: DateFilterType;
    startDate?: Date | null;
    endDate?: Date | null;
    sortOrder?: SortOrder;
    page?: number;
  }) => {
    try {
      const filter: any = {};
      if (filters.title) {
        filter.title = filters.title;
      }
      if (filters.category) {
        filter.category = filters.category;
      }
      if (filters.location) {
        filter.location = filters.location;
      }
      if (filters.dateFilter === '1day') {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        filter.startDate = oneDayAgo.toISOString();
      } else if (filters.dateFilter === '7days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filter.startDate = sevenDaysAgo.toISOString();
      } else if (filters.dateFilter === '1month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filter.startDate = oneMonthAgo.toISOString();
      } else if (filters.dateFilter === 'custom' && filters.startDate) {
        filter.startDate = filters.startDate.toISOString();
        if (filters.endDate) {
          filter.endDate = filters.endDate.toISOString();
        }
      }

      if (filters.page) {
        filter.page = filters.page;
      }

      const sortOrder = filters.sortOrder || 'desc';
      const params: any = {
        limit: 12,
        sort: sortOrder,
        ...filter,
      };

      console.log('ini params', params);
      console.log('ini filter', filter);

      const response = await axiosPublic.get(`/jobs`, {
        params,
      });

      // Ekstrak data dari respons API
      const responseData = response.data as { data: JobsResponse };
      console.log('ini data', responseData.data);

      // Update state dengan data jobs dan pagination
      if (responseData.data) {
        if (responseData.data.jobs) {
          setJobs(responseData.data.jobs);
        } else {
          setJobs([]);
        }

        if (responseData.data.pagination) {
          setPagination(responseData.data.pagination);
        } else {
          setPagination(null);
        }
      } else {
        setJobs([]);
        setPagination(null);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setPagination(null);
    }
  };
>>>>>>> 178cd18 (feat: complete all core features for initial release)

  return (
    <SearchJobContext.Provider
      value={{
        jobs,
        pagination,
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
