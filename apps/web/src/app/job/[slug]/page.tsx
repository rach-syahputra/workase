'use client';
import JobCard from '@/app/(main)/example/_components/card';
import { DialogApplyJob } from '@/app/(main)/example/_components/dialog-apply-job';
import Container from '@/components/layout/container';
import { CardBadge } from '@/components/shadcn-ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/shadcn-ui/carousel';
import { Job } from '@/context/search-job-context';
import { axiosPrivate, axiosPublic } from '@/lib/axios';
import Autoplay from 'embla-carousel-autoplay';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import JobShareComponent from './_components/job-share';
import { useToast } from '@/hooks/use-toast';
import { JobDetail } from '@/types/job-detail';

export default function JobPage() {
  //   const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const params = useParams<{ slug: string }>();
  const title = params.slug;
  const [data, setData] = useState<JobDetail | null>();
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const handleSave = async (e: React.MouseEvent) => {
    // limit area from the event
    e.preventDefault();
    e.stopPropagation();
    if (session?.user?.accessToken === undefined) {
      toast({
        title: 'Login Required',
        description: 'You need to login before saving a job',
        variant: 'destructive',
      });
      return;
    }
    try {
      const newState = !saved;
      setSaved(newState);
      const jobId = data?.id;
      if (newState) {
        const axiosInstance = axiosPrivate(
          session?.user?.accessToken as string,
          'application/json',
        );
        await axiosInstance.post(`/saved-jobs`, {
          jobId,
        });
        toast({ description: 'Job saved!' });
      } else {
        const axiosInstance = axiosPrivate(
          session?.user?.accessToken as string,
          'application/json',
        );

        await axiosInstance.delete(`/saved-jobs/${jobId}`);
        toast({ description: 'Job removed from saved' });
      }
      toast({
        description: newState ? 'Job saved!' : 'Job removed from saved',
      });
    } catch (error) {
      console.error(error);
      toast({
        description: 'An error occurred while saving or removing the job.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPublic.get(`/jobs/${title}`);
      const data = response.data;
      setData(data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axiosPublic.get(
        `/companies/${data?.company.id}/jobs`,
      );
      const companyJobs = response.data;
      setJobs(companyJobs.data.companyJobs);
    };
    fetchJobs();
  }, [data]);
  const formatCategory = (text: string) =>
    text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );
  return (
    <Container className="">
      <div className="flex flex-col items-start w-full justify-normal">
        <div className="my-2 flex w-full flex-row items-center justify-normal gap-2.5">
          <Image
            src={`${data?.company.logoUrl || ''}`}
            alt="Company logo"
            width={200}
            height={200}
            className="object-cover my-1 rounded-full aspect-square w-14"
          />
          <div className="flex flex-col justify-center w-full md:items-start">
            <Link
              href="#"
              aria-label="Company detail"
              className="flex w-full justify-normal px-[1px] py-[2px] text-[18px] font-semibold text-black"
            >
              {data?.company.name}
            </Link>
            <p className="px-[2.5px] text-sm">{data?.company.location}</p>
          </div>
        </div>
        <div className="text-[36px] font-semibold">{data?.title}</div>
        <div className="flex flex-wrap gap-2 pb-3 font-medium">
          <CardBadge className="bg-primary-gray-background">
            {formatCategory(data?.category || '')}
          </CardBadge>
        </div>
        <div className="flex flex-row items-center w-full gap-2 pb-3">
          <button className="bg-primary-blue flex h-[38px] w-full items-center justify-center rounded-md text-white hover:bg-blue-500 md:w-[195px]">
            {data?.id && <DialogApplyJob jobId={data.id as string} />}
          </button>
          {session?.user?.accessToken && (
            <button
              onClick={handleSave}
              className="hover:bg-primary-gray-background flex h-[38px] w-[30%] items-center justify-center rounded-md border border-[#495057] text-[#6C757D] md:w-[120px]"
            >
              Save
            </button>
          )}
          {data && <JobShareComponent job={data as JobDetail} />}
        </div>
        <div className="w-full py-4">
          <div className="text-[22px] font-bold">Job Description :</div>
          <div
            className="ml-4 text-justify"
            dangerouslySetInnerHTML={{ __html: data?.description || '' }}
          />
        </div>
        <div className="w-full">
          <div className="pb-2 text-[22px] font-bold">
            Other Jobs at {data?.company.name} :
          </div>
          <div className="">
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
            </Carousel>
          </div>
        </div>
      </div>
    </Container>
  );
}
