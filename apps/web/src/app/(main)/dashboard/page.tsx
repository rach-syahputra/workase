'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';

import { NewestJobs } from './_components/newestJobs';
import { NearestJobs } from './_components/nearestJob';

export default function Home() {
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
