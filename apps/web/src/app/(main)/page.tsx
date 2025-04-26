'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';

import { NewestJobs } from './_components/newest-jobs';
import { NearestJobs } from './_components/nearest-job';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
export default function HomePage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);
  return (
    <Container className="">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <SearchBar />
        </div>
        {/* <JobsCarousel /> */}
        <NewestJobs />
        <NearestJobs />
      </div>
    </Container>
  );
}
