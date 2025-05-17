'use client';

import Container from '@/components/layout/container';
import { Job } from '@/context/search-job-context';
import { axiosPublic } from '@/lib/axios';
import { Pagination } from '@/types/companies';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import AppLoading from '@/components/ui/app-loading';
import CompanyTab from './_components/company-tab';
import { CompanyReviewsProvider } from '@/context/company-reviews-context';
import { useToast } from '@/hooks/use-toast';

interface CompanyDetail {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  location: string;
  description: string;
  email: string;
  phoneNumber: string;
  category: string;
}
export default function CompanyPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const params = useParams<{ slug: string }>();
  const title = params.slug;
  const { toast } = useToast();
  const [data, setData] = useState<CompanyDetail | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPage: 1,
    hasPreviousPage: false,
    hasNextPage: false,
    totalItem: 0,
  });
  const [active, setActive] = useState('overview');
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      axiosPublic
        .get(`/companies/${title}`)
        .then((response) => {
          const data = response.data;
          setData(data.data);
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: `Error fetching data, something went wrong`,
            variant: 'destructive',
          });
        });
    };
    fetchData();
    setLoading(false);
  }, [title, toast]);
  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      if (!data?.id) return;
      axiosPublic
        .get(`/companies/${data?.id}/jobs`, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          const companyJobs = response.data;
          setJobs(companyJobs.data.companyJobs);
          setPagination(companyJobs.data.pagination);
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: `Error fetching jobs, something went wrong`,
            variant: 'destructive',
          });
        });
    };
    fetchJobs();
    setLoading(false);
  }, [active, data?.id, currentPage, toast]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleTabClick = (tabName: string) => {
    if (tabName !== active) {
      setCurrentPage(1);
      setActive(tabName);
    }
  };

  return loading ? (
    <div className="fixed top-0 left-0 flex items-center justify-center flex-1 w-screen min-h-screen bg-background">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <Container className="">
      <div className="flex flex-col items-start w-full justify-normal">
        <div className="flex flex-col items-start w-full justify-normal">
          <div className="mb-2 flex w-full flex-row items-center justify-normal gap-2.5">
            {data?.logoUrl ? (
              <Image
                src={`${data?.logoUrl || ''}`}
                alt="Company logo"
                width={200}
                height={200}
                className="object-cover w-20 my-1 rounded-full aspect-square"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-200 border rounded-full aspect-square w-28">
                <span className="text-gray-400"></span>
              </div>
            )}
            <div className="flex flex-col justify-center w-full md:items-start">
              <Link
                href="#"
                aria-label="Company detail"
                className="flex w-full justify-normal px-[1px] py-[2px] text-[20px] font-semibold text-black md:text-[22px]"
              >
                {data?.name}
              </Link>
              <div className="flex flex-col gap-1 px-[2.5px] text-sm font-light text-gray-500 md:flex-row">
                <p className="overflow-hidden w-60 overflow-ellipsis whitespace-nowrap md:w-fit">
                  {data?.location}
                </p>
                <p className="hidden md:block">·</p>
                <p className="">{data?.category}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-center">
            <div className="flex items-center gap-1">
              <FiPhone className="w-4" />
              <div className="text-sm md:text-md">{data?.phoneNumber}</div>
            </div>
            <div className="hidden mx-2 md:block">·</div>
            <div className="flex items-center gap-1">
              <HiOutlineMail className="mt-[1.5px] w-4" />
              <div className="text-sm md:text-md">{data?.email}</div>
            </div>
          </div>

          <CompanyReviewsProvider slug={title}>
            <CompanyTab
              companyDescription={data?.description || ''}
              companyJobs={jobs || []}
              companyPagination={pagination}
              handleJobPageChange={handlePageChange}
            />
          </CompanyReviewsProvider>
        </div>
      </div>
    </Container>
  );
}
