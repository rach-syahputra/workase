'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './components/searchbar';
import JobCard from '../example/_components/card';
import { useSearchJob } from '@/context/search-job-context';
import CardExample from '../example/_components/card-example';
export default function Home() {
  const { jobs } = useSearchJob();
  console.log('jobs', jobs);
  return (
    <Container className="">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-geist flex h-fit w-full flex-col items-center justify-center">
          <SearchBar />
        </div>
        <div className="my-5 text-sm">5 Newest Jobs Available </div>
        <div className="mt-5">
          {jobs.length === 0 && (
            <div className="border-primary-gray flex h-[200px] w-full items-center justify-center rounded-md border-2 border-dashed">
              <div className="text-primary-gray">No Jobs Available</div>
            </div>
          )}
          {jobs.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard
                  description={job.description}
                  title={job.title}
                  location={job.company.location}
                  category={job.category}
                  companyName={job.company.name}
                  key={job.id}
                />
              ))}
            </div>
          )}
          <CardExample></CardExample>
        </div>
      </div>
    </Container>
  );
}
