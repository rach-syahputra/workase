'use client';
import { Search } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { FaLocationDot } from 'react-icons/fa6';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { axiosPublic } from '@/lib/axios';
import { useSearchJob } from '@/context/search-job-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { IGetCompany } from '@/lib/interfaces/companies';

interface CompaniesSearchBarProps {
  formik: ReturnType<typeof useFormik<IGetCompany>>;
  isFetch: boolean;
}

export function CompaniesSearchBar({
  formik,
  isFetch,
}: CompaniesSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('Company Name');
  const search = ['Company Name', 'Company Location', 'Find Companies'];

  return (
    <div className="border-primary-gray mt-[5px] w-full max-w-[705px] flex-col items-center justify-center rounded-md p-[5px] md:flex md:flex-row md:items-center md:justify-normal md:border-[1px] md:shadow-[1px_1px_10px_3px_rgba(0,0,0,0.1)]">
      {search.map((item) => (
        <div
          key={item}
          className={`relative flex-col items-center text-center md:h-[44px] ${item === 'Company Name' ? 'border-primary-gray my-[-2px] rounded-t-md border-[2px] md:pt-[2px]' : item === 'Company Location' ? 'border-primary-gray mb-1 rounded-b-md border-[2px]' : ''} md:my-0 md:flex md:flex-row md:border-none md:pt-0`}
        >
          <div className="flex h-[52px] items-center justify-center">
            {/* Logo item */}
            {item === 'Company Name' ? (
              <Search
                size={20}
                className={`ml-5 w-[25px] md:mb-[2px] md:ml-3 ${activeTab === 'Company Name' ? 'text-primary-blue' : ''}`}
              />
            ) : item === 'Company Location' ? (
              <FaLocationDot
                size={20}
                className={`ml-5 w-[25px] ${activeTab === 'Company Location' ? 'text-primary-blue' : ''}`}
              />
            ) : null}

            {/* Filter and Button */}
            {item === 'Company Name' || item === 'Company Location' ? (
              (() => {
                const fieldKey = item.split(' ')[1]?.toLowerCase() || ''; // Pastikan tidak undefined
                return (
                  <input
                    onClick={() => setActiveTab(item)}
                    type="text"
                    ref={undefined}
                    className={`relative h-full w-full px-5 text-[15px] font-medium focus:border-[0px] focus:outline-none md:max-w-[337px] ${item === 'Company Name' ? 'md:mt-[-1px]' : ''}`}
                    placeholder={item}
                    id={fieldKey}
                    name={fieldKey}
                    value={formik.values[fieldKey as keyof IGetCompany] || ''}
                    onChange={formik.handleChange}
                  ></input>
                );
              })()
            ) : (
              <Button
                ref={undefined}
                type="submit"
                className={`bg-primary-blue relative h-[44px] w-full px-5 text-[15px] font-medium md:h-[40px] md:w-[150px]`}
                disabled={isFetch}
              >
                {item}
              </Button>
            )}
          </div>

          {/* vertical border */}
          {item === 'Company Name' && (
            <center
              className={`mx-[1px] bg-gray-300 md:h-[25px] md:w-[1.5px] md:border-none ${item === 'Company Name' ? 'md:mt-[-2px]' : ''}`}
            ></center>
          )}
        </div>
      ))}
    </div>
  );
}
