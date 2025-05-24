'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getSession } from 'next-auth/react';

import { ISavedReview } from '@/lib/interfaces/company-review';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import {
  addSavedReview,
  getSavedReviews,
  removeSavedReview,
} from '@/lib/apis/company-reviews';
import { HandleSavedReviewRequest, ISavedReviewsContext } from './interface';
import { useToast } from '@/hooks/use-toast';
import { useAppToast } from '@/hooks/use-app-toast';
import { useCompaniesReviewsContext } from '../companies-reviews-context';

interface SavedReviewsProviderProps {
  children: React.ReactNode;
}

const SavedReviewsContext = createContext<ISavedReviewsContext | undefined>(
  undefined,
);

const SavedReviewsProvider = ({ children }: SavedReviewsProviderProps) => {
  const { appToast } = useAppToast();
  const { toast } = useToast();
  const { setReviews } = useCompaniesReviewsContext();
  const firstRenderRef = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalSavedReviews, setTotalSavedReviews] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [order, setOrder] = useState<OrderType>('desc');
  const [savedReviews, setSavedReviews] = useState<ISavedReview[]>([]);

  const fetchGetSavedReviews = useCallback(async () => {
    setIsLoading(true);

    const response = await getSavedReviews({
      limit: 8,
      page: page || 1,
      order,
      q: debouncedQuery,
    });

    if (response.success) {
      setSavedReviews(response.data?.savedReviews || []);
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setTotalSavedReviews(response.data?.pagination?.totalData || 0);
      setPage(response.data?.pagination?.page || 1);
    }

    setIsLoading(false);
  }, [page, debouncedQuery, order]);

  const handleSavedReview = async (req: HandleSavedReviewRequest) => {
    setIsSaving(true);

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

        toast({
          title: 'Review Saved',
          description: 'Review successfully saved.',
        });
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

        toast({
          title: 'Review Unsaved',
          description: 'Review successfully unsaved.',
        });
      }
    }

    fetchGetSavedReviews();
    setIsSaving(false);
  };

  useEffect(() => {
    const handleDebouncedQuery = setTimeout(() => {
      firstRenderRef.current = false;
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handleDebouncedQuery);
  }, [query]);

  useEffect(() => {
    if (firstRenderRef.current === true) return;
    firstRenderRef.current = true;

    fetchGetSavedReviews();
  }, [fetchGetSavedReviews]);

  return (
    <SavedReviewsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isSaving,
        setIsSaving,
        page,
        setPage,
        totalPages,
        setTotalPages,
        order,
        setOrder,
        query,
        setQuery,
        totalSavedReviews,
        setTotalSavedReviews,
        savedReviews,
        setSavedReviews,
        fetchGetSavedReviews,
        handleSavedReview,
        firstRenderRef,
      }}
    >
      {children}
    </SavedReviewsContext.Provider>
  );
};

const useSavedReviewsContext = (): ISavedReviewsContext => {
  const context = useContext(SavedReviewsContext);
  if (context === undefined) {
    throw new Error(
      'useSavedReviewsContext must be used within a SavedReviewsProvider',
    );
  }
  return context;
};

export { SavedReviewsProvider, useSavedReviewsContext };
