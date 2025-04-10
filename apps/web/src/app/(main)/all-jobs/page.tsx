'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { SearchJobs } from './_components/searchJobs';
import { useSearchParams } from 'next/navigation';
import { useSearchJob } from '@/context/search-job-context';
import { useEffect } from 'react';
export default function AllJobs() {
  return (
    <Container className="">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <SearchBar />
        </div>
        <SearchJobs />
      </div>
    </Container>
  );
}
