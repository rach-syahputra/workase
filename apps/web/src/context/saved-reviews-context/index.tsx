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
import {
  addSavedReview,
  getSavedReviews,
  removeSavedReview,
} from '@/lib/apis/company-reviews';
import { HandleSavedReviewRequest, ISavedReviewsContext } from './interface';
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
  const { setReviews } = useCompaniesReviewsContext();
  const firstRenderRef = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalSavedReviews, setTotalSavedReviews] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [savedReviews, setSavedReviews] = useState<ISavedReview[]>([]);

  const fetchGetSavedReviews = useCallback(async () => {
    setIsLoading(true);

    const response = await getSavedReviews({
      limit: 10,
      page: page || 1,
      order: 'desc',
    });

    if (response.success) {
      setSavedReviews(response.data?.savedReviews || []);
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setTotalSavedReviews(response.data?.pagination?.totalData || 0);
      setPage(response.data?.pagination?.page || 1);
    }

    setIsLoading(false);
  }, [page]);

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

    fetchGetSavedReviews();
  };

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
        page,
        setPage,
        totalPages,
        setTotalPages,
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
