'use client';
import JobCard from '@/app/(main)/example/_components/card';
import Container from '@/components/layout/container';
import { Job } from '@/context/search-job-context';
import { axiosPublic } from '@/lib/axios';
import { Pagination } from '@/types/companies';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { CompanyJobsPagination } from './_components/company-jobs-pagination';
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
  const [data, setData] = useState<CompanyDetail | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPage: 1,
    hasPreviousPage: false,
    hasNextPage: false,
    totalItem: 0,
  });
  const [active, setActive] = useState('overview');
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPublic.get(`/companies/${title}`);
      const data = response.data;
      setData(data.data);
    };
    fetchData();
  }, [title]);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axiosPublic.get(`/companies/${data?.id}/jobs`, {
        params: {
          page: currentPage,
        },
      });
      const companyJobs = response.data;
      console.log('masuk sini kah 2:', companyJobs.data.companyJobs);
      setJobs(companyJobs.data.companyJobs);
      setPagination(companyJobs.data.pagination);
    };
    fetchJobs();
  }, [active, data?.id, currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleTabClick = (tabName: string) => {
    if (tabName !== active) {
      setCurrentPage(1);
      setActive(tabName);
    }
  };
  return (
    <Container className="">
      <div className="flex flex-col items-start w-full justify-normal">
        <div className="flex flex-col items-start w-full justify-normal">
          <div className="my-2 flex w-full flex-row items-center justify-normal gap-2.5">
            <Image
              src={`${data?.logoUrl || ''}`}
              alt="Company logo"
              width={200}
              height={200}
              className="object-cover my-1 rounded-full aspect-square w-28"
            />
            <div className="flex flex-col justify-center w-full md:items-start">
              <Link
                href="#"
                aria-label="Company detail"
                className="flex w-full justify-normal px-[1px] py-[2px] text-[30px] font-semibold text-black"
              >
                {data?.name}
              </Link>
              <div className="flex gap-1 px-[2.5px] text-lg font-light">
                <p className="">{data?.location}</p>
                <p className="">·</p>
                <p>{data?.category}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <div className="flex items-center gap-1">
              <FiPhone />
              <div className="">{data?.phoneNumber}</div>
            </div>
            <div className="hidden mx-2 md:block">·</div>
            <div className="flex items-center gap-1">
              <HiOutlineMail />
              <div className="">{data?.email}</div>
            </div>
          </div>

          <div className="w-full mt-3 border-b border-gray-300">
            <nav className="flex">
              <button
                onClick={() => setActive('overview')}
                className={`px-7 py-4 font-medium ${active === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActive('job posted')}
                className={`px-7 py-4 font-medium ${active === 'job posted' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Job Posted
              </button>
            </nav>
          </div>

          <div className="">
            {active == 'overview' ? (
              <div
                className="py-4"
                dangerouslySetInnerHTML={{ __html: data?.description || '' }}
              />
            ) : (
              <div className="flex justify-center py-4">
                <div className="w-full max-w-[90%] pt-[12px] md:pt-0 lg:max-w-[90%]">
                  {jobs.length > 0 && (
                    <>
                      <div className="my-4">
                        {jobs.length > 0 && (
                          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {jobs.map((job) => (
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
                            ))}
                          </div>
                        )}
                      </div>
                      {pagination.totalPage > 1 && (
                        <CompanyJobsPagination
                          {...pagination}
                          onPageChange={handlePageChange}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
