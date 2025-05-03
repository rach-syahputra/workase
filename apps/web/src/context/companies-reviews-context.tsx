'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICompanyReview } from '@/lib/interfaces/company-review';
import { getCompaniesReviews } from '@/lib/apis/company-reviews';

interface ICompaniesReviewsContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  reviews: ICompanyReview[];
  setReviews: Dispatch<SetStateAction<ICompanyReview[]>>;
  fetchCompaniesReviews: (option?: IOption) => void;
}

interface IOption {
  isLoadMore: boolean;
}

const CompaniesReviewsContext = createContext<
  ICompaniesReviewsContext | undefined
>(undefined);

const CompaniesReviewsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ICompanyReview[]>([]);

  const fetchCompaniesReviews = useCallback(
    async (option?: IOption) => {
      setIsLoading(true);

      const response = await getCompaniesReviews({
        order: 'desc',
        cursor,
        limit: 15,
      });

      if (response.success) {
        const newReviews = response.data?.reviews;
        const updatedReviews = option?.isLoadMore
          ? [...reviews, ...(newReviews || [])]
          : newReviews || [];

        setReviews(updatedReviews);
        setCursor(response.data?.pagination.cursor || '');
        setHasMore(
          updatedReviews.length >= (response.data?.pagination.totalData || 0)
            ? false
            : true,
        );
      }

      setIsLoading(false);
    },
    [cursor, reviews],
  );

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        fetchCompaniesReviews({ isLoadMore: true });
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [isLoading, hasMore, fetchCompaniesReviews]);

  return (
    <CompaniesReviewsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        reviews,
        setReviews,
        fetchCompaniesReviews,
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
