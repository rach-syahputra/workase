'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { SearchJobs } from './_components/search-jobs';
import FilterBaseOnTime from './_components/filter-base-on-time';
import AppLoading from '@/components/ui/app-loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSearchJob } from '@/context/search-job-context';
type SortOrder = 'asc' | 'desc';
export default function AllJobs() {
  const { jobs, pagination, fetchJobs, setLoading } = useSearchJob();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState({
    title: '',
    category: '',
    location: '',
    page: null as number | null,
    dateFilter: null as string | null,
    startDate: null as Date | null,
    endDate: null as Date | null,
    sortOrder: 'desc' as SortOrder,
  });

  // preventif for re-fetch
  const lastQueryRef = useRef(query);
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
      nextQuery.page !== lastQueryRef.current.page ||
      nextQuery.dateFilter !== lastQueryRef.current.dateFilter ||
      nextQuery.startDate !== lastQueryRef.current.startDate ||
      nextQuery.endDate !== lastQueryRef.current.endDate ||
      nextQuery.sortOrder !== lastQueryRef.current.sortOrder;

    if (isDifferent) {
      setLoading(true);
      const params = new URLSearchParams();
      if (nextQuery.title) params.set('title', nextQuery.title);
      if (nextQuery.category) params.set('category', nextQuery.category);
      if (nextQuery.location) params.set('location', nextQuery.location);
      if (nextQuery.dateFilter) params.set('dateFilter', nextQuery.dateFilter);
      if (nextQuery.startDate)
        params.set('startDate', nextQuery.startDate.toString());
      if (nextQuery.endDate)
        params.set('endDate', nextQuery.endDate.toString());
      if (nextQuery.sortOrder) params.set('sortOrder', nextQuery.sortOrder);
      if (nextQuery.page) params.set('page', nextQuery.page.toString());

      setQuery(nextQuery);
      lastQueryRef.current = nextQuery;
      fetchJobs(nextQuery);
    }
  }, [fetchJobs, router, searchParams, setLoading]);
  return jobs.length === undefined ? (
    <div className="bg-background fixed left-0 top-0 flex min-h-screen w-screen flex-1 items-center justify-center">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <Container className="">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <SearchBar />
        </div>
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <FilterBaseOnTime></FilterBaseOnTime>
        </div>
        {jobs.length === 0 ? (
          <div className="mt-2 flex h-[calc(100vh-440px)] w-full items-center justify-center sm:mt-0 sm:h-[calc(100vh-550px)] md:h-[calc(100vh-370px)]">
            <div className="">There are no jobs available</div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            {pagination && <SearchJobs pagination={pagination} jobs={jobs} />}
          </div>
        )}
      </div>
    </Container>
  );
}
