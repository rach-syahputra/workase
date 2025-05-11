'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { SearchJobs } from './_components/search-jobs';
import FilterBaseOnTime from './_components/filter-base-on-time';
export default function AllJobs() {
  return (
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
