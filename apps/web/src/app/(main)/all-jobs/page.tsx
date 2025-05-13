'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { SearchJobs } from './_components/search-jobs';
import FilterBaseOnTime from './_components/filter-base-on-time';
import AppLoading from '@/components/ui/app-loading';
import { useState } from 'react';
import { useSearchJob } from '@/context/search-job-context';
export default function AllJobs() {
  const [loading, setLoading] = useState(true);
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2300);
  return loading ? (
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
        <SearchJobs />
      </div>
    </Container>
  );
}
