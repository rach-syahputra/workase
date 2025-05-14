'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { SearchJobs } from './_components/search-jobs';
import FilterBaseOnTime from './_components/filter-base-on-time';
import AppLoading from '@/components/ui/app-loading';
import { useState } from 'react';
export default function AllJobs() {
  const [loading, setLoading] = useState(true);
  const timer = setTimeout(() => {
    setLoading(false);
  }, 4300);
  return loading ? (
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
        <SearchJobs />
      </div>
    </Container>
  );
}
