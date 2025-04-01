'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { ICompanyReview } from '@/lib/interfaces/company-review';
import { getCompaniesReviews } from '@/lib/apis/company-reviews';

interface ICompaniesReviewsContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  reviews: ICompanyReview[];
  setReviews: Dispatch<SetStateAction<ICompanyReview[]>>;
  fetchCompaniesReviews: () => void;
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
  const [reviews, setReviews] = useState<ICompanyReview[]>([]);

  const fetchCompaniesReviews = async () => {
    setIsLoading(true);

    const response = await getCompaniesReviews({
      order: 'desc',
    });

    if (response.success) {
      setReviews(response.data?.reviews || []);
    }

    setIsLoading(false);
  };

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
