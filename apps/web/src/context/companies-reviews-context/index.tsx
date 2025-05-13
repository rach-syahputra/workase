'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';

import { ICompanyReview } from '@/lib/interfaces/company-review';
import { getCompaniesReviews } from '@/lib/apis/company-reviews';
import { ICurrentCompany } from '@/lib/interfaces/user-stats';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import { ICompaniesReviewsContext, IOption } from './interface';

interface CompaniesReviewsProviderProps {
  userCurrentCompanies: ICurrentCompany[];
  children: React.ReactNode;
}

const CompaniesReviewsContext = createContext<
  ICompaniesReviewsContext | undefined
>(undefined);

const CompaniesReviewsProvider = ({
  userCurrentCompanies,
  children,
}: CompaniesReviewsProviderProps) => {
  const searchParams = useSearchParams();
  const firstRenderRef = useRef(false);
  const renderWithQ = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ICompanyReview[]>([]);
  const order = searchParams.get('order') as OrderType;

  const fetchCompaniesReviews = useCallback(
    async (option?: IOption) => {
      setIsLoading(true);

      const response = await getCompaniesReviews({
        order: order || 'desc',
        cursor: option?.cursor,
        q: debouncedQuery,
        limit: 15,
      });

      if (response.success) {
        const newReviews = response.data?.reviews;

        setReviews((prev) =>
          option?.isLoadMore
            ? [...prev, ...(newReviews || [])]
            : newReviews || [],
        );

        setCursor(response.data?.pagination.cursor || '');

        const totalData = response.data?.pagination.totalData || 0;
        const totalFetched =
          (option?.isLoadMore ? reviews.length : 0) +
          (newReviews && newReviews.length ? newReviews.length : 0);
        setHasMore(totalFetched < totalData);
      }

      renderWithQ.current = false;
      setIsLoading(false);
    },
    [order, debouncedQuery, reviews.length],
  );

  useEffect(() => {
    const handleDebouncedQuery = setTimeout(() => {
      firstRenderRef.current = false;
      renderWithQ.current = true;

      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handleDebouncedQuery);
  }, [query]);

  useEffect(() => {
    if (firstRenderRef.current) return;
    firstRenderRef.current = true;

    fetchCompaniesReviews();
  }, [fetchCompaniesReviews]);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        fetchCompaniesReviews({ isLoadMore: true, cursor });
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [isLoading, cursor, hasMore, fetchCompaniesReviews]);

  return (
    <CompaniesReviewsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        order,
        reviews,
        setReviews,
        query,
        setQuery,
        fetchCompaniesReviews,
        firstRenderRef,
        renderWithQ,
        userCurrentCompanies,
      }}
    >
      {children}
    </CompaniesReviewsContext.Provider>
  );
};

const useCompaniesReviewsContext = (): ICompaniesReviewsContext => {
  const context = useContext(CompaniesReviewsContext);
  if (context === undefined) {
    throw new Error(
      'useCompaniesReviewsContext must be used within a CompaniesReviewsProvider',
    );
  }
  return context;
};

export { CompaniesReviewsProvider, useCompaniesReviewsContext };
