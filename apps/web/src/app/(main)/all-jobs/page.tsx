'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { SearchJobs } from './_components/search-jobs';
import FilterBaseOnTime from './_components/filter-base-on-time';
import AppLoading from '@/components/ui/app-loading';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSearchJob } from '@/context/search-job-context';
type SortOrder = 'asc' | 'desc';
export default function AllJobs() {
  const { jobs, pagination, fetchJobs } = useSearchJob();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState({
    title: '',
    category: '',
    location: '',
    page: 1,
  });

  // preventif for re-fetch
  const lastQueryRef = useRef(query);
  useEffect(() => {
    fetchJobs(query);
  }, [fetchJobs, query]);
  useEffect(() => {
    const nextQuery = {
      title: searchParams.get('title') || '',
      category: searchParams.get('category') || '',
      location: searchParams.get('location') || '',
      dateFilter: (searchParams.get('dateFilter') as any) || null,
      startDate: searchParams.get('startDate')
        ? new Date(searchParams.get('startDate')!)
        : null,
      endDate: searchParams.get('endDate')
        ? new Date(searchParams.get('endDate')!)
        : null,
      sortOrder: (searchParams.get('sortOrder') as SortOrder) || 'desc',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    };

    const isDifferent =
      nextQuery.title !== lastQueryRef.current.title ||
      nextQuery.category !== lastQueryRef.current.category ||
      nextQuery.location !== lastQueryRef.current.location ||
      nextQuery.page !== lastQueryRef.current.page;

    if (isDifferent) {
      setQuery(nextQuery);
      lastQueryRef.current = nextQuery;
      fetchJobs(nextQuery);
    }
  }, [fetchJobs, searchParams]);

  return jobs.length === 0 ? (
    <div className="fixed top-0 left-0 flex items-center justify-center flex-1 w-screen min-h-screen bg-background">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <Container className="">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <SearchBar />
        </div>
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <FilterBaseOnTime></FilterBaseOnTime>
        </div>
        {pagination && <SearchJobs pagination={pagination} jobs={jobs} />}
      </div>
    </Container>
  );
}
