import * as React from 'react';
import { useEffect, useState } from 'react';

import { axiosPublic } from '@/lib/axios';
import { Job, JobsResponse } from '@/context/search-job-context';
import JobCard from '../example/_components/card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn-ui/carousel';
import { Sparkles } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
interface NewestJobsProps {
  jobs: Job[];
}

export function NewestJobs({ jobs }: NewestJobsProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );
  return (
    <div className="w-full max-w-[90%] lg:max-w-[90%]">
      {jobs.length > 0 && (
        <>
          <div className="font-geist mb-[9px] flex items-center justify-center gap-1 text-[13.0px] text-sm font-medium sm:text-[16.0px] md:my-5">
            <Sparkles className="text-blue-500 scale-75" />5 Newest Jobs
            Available For You, <u> Swipe !</u>
          </div>
          <Carousel
            className=""
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="flex w-full gap-6 p-1 -ml-1">
              {Array.from({ length: 5 }).map((_, index: number) => {
                const job = jobs[index];
                return job ? (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-[48.5%] lg:basis-[31.90%]"
                  >
                    <div className="">
                      <JobCard
                        id={job.id}
                        slug={job.slug}
                        description={job.description}
                        title={job.title}
                        location={job.company.location}
                        category={job.category}
                        companyName={job.company.name}
                        createdAt={job.createdAt}
                        key={job.id}
                        logoUrl={job.company.logoUrl}
                      />
                    </div>
                  </CarouselItem>
                ) : null;
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden scale-0 sm:flex sm:scale-100" />
            <CarouselNext className="hidden scale-0 sm:flex sm:scale-100" />
          </Carousel>
        </>
      )}
    </div>
  );
}
