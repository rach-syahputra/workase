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
import { getSession } from 'next-auth/react';

import { ICompanyReview } from '@/lib/interfaces/company-review';
import {
  addSavedReview,
  getCompanyReviews,
  removeSavedReview,
} from '@/lib/apis/company-reviews';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import {
  HandleSavedReviewRequest,
  ICompanyReviewsContext,
  IOption,
} from './interface';
import { useAppToast } from '@/hooks/use-app-toast';

interface CompanyReviewsProviderProps {
  slug: string;
  children: React.ReactNode;
}

const CompanyReviewsContext = createContext<ICompanyReviewsContext | undefined>(
  undefined,
);

const CompanyReviewsProvider = ({
  slug,
  children,
}: CompanyReviewsProviderProps) => {
  const searchParams = useSearchParams();
  const { appToast } = useAppToast();
  const firstRenderRef = useRef(false);
  const renderWithQ = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ICompanyReview[]>([]);
  const order = searchParams.get('order') as OrderType;

  const fetchGetCompanyReviews = useCallback(
    async (option?: IOption) => {
      setIsLoading(true);

      const response = await getCompanyReviews({
        order: order || 'desc',
        cursor: option?.cursor,
        q: debouncedQuery,
        limit: 15,
        slug,
      });

      if (response.success) {
        const newReviews = response.data?.reviews;

        if (renderWithQ.current) {
          setReviews(newReviews || []);
        } else {
        }
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
    [order, slug, debouncedQuery, reviews.length],
  );

  const handleSavedReview = async (req: HandleSavedReviewRequest) => {
    const session = await getSession();
    if (!session?.user || !session.user.accessToken) {
      return appToast('ERROR_UNAUTHENTICATED', {
        title: 'Unauthenticated',
        description: 'Sign in to start saving company reviews.',
      });
    }

    if (req.action === 'ADD') {
      const response = await addSavedReview(req);

      if (response.success) {
        setReviews((prev) =>
          prev.map((review) =>
            review.id === req.companyReviewId
              ? { ...review, saved: true, savedCount: review.savedCount + 1 }
              : review,
          ),
        );
      }
    } else if (req.action === 'REMOVE') {
      const response = await removeSavedReview(req);

      if (response.success) {
        setReviews((prev) =>
          prev.map((review) =>
            review.id === req.companyReviewId
              ? { ...review, saved: false, savedCount: review.savedCount - 1 }
              : review,
          ),
        );
      }
    }

    fetchGetCompanyReviews();
  };

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

    fetchGetCompanyReviews();
  }, [fetchGetCompanyReviews]);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        fetchGetCompanyReviews({ isLoadMore: true, cursor });
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [isLoading, cursor, hasMore, fetchGetCompanyReviews]);

  return (
    <CompanyReviewsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        order,
        reviews,
        setReviews,
        query,
        setQuery,
        fetchGetCompanyReviews,
        handleSavedReview,
        firstRenderRef,
        renderWithQ,
        slug,
      }}
    >
      {children}
    </CompanyReviewsContext.Provider>
  );
};

const useCompanyReviewsContext = (): ICompanyReviewsContext => {
  const context = useContext(CompanyReviewsContext);
  if (context === undefined) {
    throw new Error(
      'useCompanyReviewsContext must be used within a CompanyReviewsProvider',
    );
  }
  return context;
};

export { CompanyReviewsProvider, useCompanyReviewsContext };
