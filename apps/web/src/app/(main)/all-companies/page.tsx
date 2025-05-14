'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import CompaniesCard from './_components/companies-card';
import { useState, useEffect } from 'react';
import { axiosPublic } from '@/lib/axios';
import { CompaniesSearchBar } from './_components/companies-searchbar';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  CompaniesResponse,
  IAllCompaniesProps,
  IGetCompany,
  Pagination,
} from '@/types/companies';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import CompaniesPagination from './_components/companies-pagination';
import AppLoading from '@/components/ui/app-loading';
import { AllCompaniesFilterSchema } from '@/validations/all-companies';
import { useToast } from '@/hooks/use-toast';

export default function AllCompanies() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [companies, setCompanies] = useState<IAllCompaniesProps[]>([]);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPage: 1,
    hasPreviousPage: false,
    hasNextPage: false,
    totalItem: 0,
  });
  const initialValues: IGetCompany = {
    name: '',
    sort: 'asc',
    location: '',
    page: 1,
  };
  const fetchCompanies = React.useCallback(
    async (values: IGetCompany) => {
      try {
        const response = await axiosPublic.get('/companies', {
          params: {
            page: values.page,
            name: values.name,
            location: values.location,
            sort: values.sort,
          },
        });
        const data = (await response.data.data) as CompaniesResponse;
        setCompanies(data.sortedCompanies);
        setPagination(data.pagination);
      } catch (error) {
        setCompanies([]);
        toast({
          title: 'Error',
          description: `Error fetching companies:${error}`,
          variant: 'destructive',
        });
      }
      setLoading(false);
    },
    [toast],
  );
  const hanlerSortChange = (value: string) => {
    const newSortOrder = value as 'desc' | 'asc';
    setSortOrder(newSortOrder);

    const updateValues = {
      ...formik.values,
      sort: newSortOrder,
    };
    formik.setValues(updateValues);

    applyFilters(updateValues);
  };
  const applyFilters = (values: IGetCompany) => {
    const params = new URLSearchParams();
    if (values.name) params.set('name', values.name);
    if (values.page) params.set('page', values.page.toString());
    if (values.location) params.set('location', values.location);
    if (values.sort !== 'asc') params.set('sort', values.sort);
    router.push(`/all-companies?${params.toString()}`);
    fetchCompanies(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: AllCompaniesFilterSchema,
    onSubmit: (values) => {
      const searchValues = {
        ...values,
        page: 1,
      };
      applyFilters(searchValues);
    },
  });
  useEffect(() => {
    try {
      setLoading(true);
      const nameParam = searchParams.get('name') || '';
      const locationParam = searchParams.get('location') || '';
      const sortParam = searchParams.get('sort') || 'asc';
      const pageParam = searchParams.get('page') || '1';
      const query = {
        name: nameParam,
        location: locationParam,
        sort: sortParam as 'asc' | 'desc',
        page: parseInt(pageParam, 10),
      };
      fetchCompanies(query);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error fetching companies:${error}`,
        variant: 'destructive',
      });
    }
  }, [fetchCompanies, searchParams, toast]);
  return loading ? (
    <div className="bg-background fixed left-0 top-0 flex min-h-screen w-screen flex-1 items-center justify-center">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <Container className="">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full items-center justify-center"
          >
            <CompaniesSearchBar formik={formik} />
          </form>
        </div>
        <div className="font-geist mt-1 flex h-fit w-full max-w-[97%] flex-col items-center justify-center md:max-w-[90%] md:flex-row md:items-center md:justify-between">
          <div className="hidden text-[21px] font-medium md:block">
            Explore Companies :
          </div>
          <div className="h-full w-full md:w-[200px]">
            <Select value={sortOrder} onValueChange={hanlerSortChange}>
              <SelectTrigger className="w-full border border-black outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="asc">A - Z</SelectItem>
                  <SelectItem value="desc">Z - A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full max-w-[90%] pt-[12px] md:pt-0 lg:max-w-[90%]">
          <div className="my-4">
            {companies?.length > 0 ? (
              <>
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {companies.map((company) => (
                    <CompaniesCard
                      key={company.slug}
                      _count={company._count?.Job || 0}
                      location={company.location}
                      category={company.category}
                      name={company.name}
                      slug={company.slug}
                      logoUrl={company.logoUrl}
                    />
                  ))}
                </div>
                {pagination && <CompaniesPagination {...pagination} />}
              </>
            ) : (
              <div className="py-40 text-center">
                <p>No companies found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
