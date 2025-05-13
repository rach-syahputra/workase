'use client';
import { Search } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { FaLocationDot } from 'react-icons/fa6';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSearchJob } from '@/context/search-job-context';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Title hanya boleh mengandung huruf, angka, dan spasi',
    )
    .optional(),
  category: Yup.string().optional(),
  location: Yup.string().optional(),
});

interface IFilterForm {
  title: string;
  category: string;
  location: string;
}
export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('Job Title');
  const { fetchJobs } = useSearchJob();
  const search = [
    'Job Title',
    'Company Location',
    'Company Category',
    'Find Jobs',
  ];

  const initialValues: IFilterForm = {
    title: '',
    category: '',
    location: '',
  };

  const [searchValues, setSearchValues] = useState<IFilterForm>(initialValues);

  useEffect(() => {
    const dateFilterParam = searchParams.get('dateFilter');
    const sortOrderParam =
      (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
    const dateFromParams = searchParams.get('startDate');
    const dateToParams = searchParams.get('endDate');
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        fetchJobs({
          title: '',
          category: '',
          location: position.coords.latitude + ',' + position.coords.longitude,
          dateFilter: dateFilterParam as any,
          startDate: dateFromParams ? new Date(dateFromParams) : null,
          endDate: dateToParams ? new Date(dateToParams) : null,
          sortOrder: sortOrderParam,
        });
      } catch (error) {
        console.error('there is no location', error);
      }
    });
  }, [fetchJobs, searchParams]);

  const sortOrderParam =
    (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
  const dateFilterParam = searchParams.get('dateFilter');
  const dateFromParams = searchParams.get('startDate');
  const dateToParams = searchParams.get('endDate');
  const formik = useFormik({
    initialValues,
    validationSchema: FilterSchema,
    onSubmit: (values) => {
      fetchJobs({
        ...values,
        dateFilter: dateFilterParam as any,
        startDate: dateFromParams ? new Date(dateFromParams) : null,
        endDate: dateToParams ? new Date(dateToParams) : null,
        sortOrder: sortOrderParam,
      });
      const query = new URLSearchParams({
        title: values.title,
        category: values.category,
        location: values.location,
      }).toString();
      router.push(`/all-jobs?${query}`);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="border-primary-gray mt-[5px] w-full max-w-[835px] flex-col items-center justify-center rounded-md p-[5px] md:flex md:flex-row md:items-center md:justify-around md:border-[1px] md:shadow-[1px_1px_10px_3px_rgba(0,0,0,0.1)]"
    >
      {search.map((item) => (
        <div
          key={item}
          className={`relative flex-col items-center text-center md:h-[44px] ${item === 'Job Title' ? 'border-primary-gray rounded-t-md border-[2px] md:pt-[2px]' : item === 'Company Location' ? 'border-primary-gray my-[-2px] border-[2px]' : item === 'Company Category' ? 'border-primary-gray mb-1 rounded-b-md border-[2px]' : ''} md:my-0 md:flex md:flex-row md:border-none md:pt-0`}
        >
          <div className="flex h-[52px] items-center justify-center">
            {/* Logo item */}
            {item === 'Job Title' ? (
              <Search
                size={20}
                className={`ml-5 w-[25px] md:mb-[2px] md:ml-3 ${activeTab === 'Job Title' ? 'text-primary-blue' : ''}`}
              />
            ) : item === 'Company Category' ? (
              <Building2
                size={20}
                className={`ml-5 w-[25px] md:mt-[2px] ${activeTab === 'Company Category' ? 'text-primary-blue' : ''}`}
              />
            ) : item === 'Company Location' ? (
              <FaLocationDot
                size={20}
                className={`ml-5 w-[25px] ${activeTab === 'Company Location' ? 'text-primary-blue' : ''}`}
              />
            ) : null}

            {/* Filter dan Button */}
            {item === 'Job Title' ||
            item === 'Company Category' ||
            item === 'Company Location' ? (
              (() => {
                const fieldKey = item.split(' ')[1]?.toLowerCase() || ''; // Pastikan tidak undefined
                return (
                  <input
                    onClick={() => setActiveTab(item)}
                    type="text"
                    ref={undefined}
                    className={`relative h-full w-full px-5 text-[15px] font-medium focus:border-[0px] focus:outline-none md:max-w-[225px] ${item === 'Company Category' ? 'md:mt-[2px]' : item === 'Job Title' ? 'md:mt-[-1px]' : ''}`}
                    placeholder={item}
                    id={fieldKey}
                    name={fieldKey}
                    value={formik.values[fieldKey as keyof IFilterForm] || ''}
                    onChange={formik.handleChange}
                  ></input>
                );
              })()
            ) : (
              <Button
                ref={undefined}
                type="submit"
                className={`bg-primary-blue relative h-[44px] w-full px-5 text-[15px] font-medium md:h-[40px] md:w-[110px]`}
              >
                {item}
              </Button>
            )}
          </div>

          {/* Border Vertikal (Hanya untuk item pertama kedua) */}
          {(item === 'Job Title' || item === 'Company Location') && (
            <center
              className={`mx-[1px] bg-gray-300 md:h-[25px] md:w-[1.5px] md:border-none ${item === 'Job Title' ? 'md:mt-[-2px]' : ''}`}
            ></center>
          )}
        </div>
      ))}
    </form>
  );
}
