import { Dispatch, SetStateAction } from 'react';

import { ISavedReview } from '@/lib/interfaces/company-review';
import { OrderType } from '@/lib/interfaces/api-request/filter';

export interface HandleSavedReviewRequest {
  companyReviewId: string;
  companySlug: string;
  action: 'ADD' | 'REMOVE';
}

export interface ISavedReviewsContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  order: OrderType;
  setOrder: Dispatch<SetStateAction<OrderType>>;
  totalSavedReviews: number;
  setTotalSavedReviews: Dispatch<SetStateAction<number>>;
  savedReviews: ISavedReview[];
  setSavedReviews: Dispatch<SetStateAction<ISavedReview[]>>;
  fetchGetSavedReviews: () => void;
  handleSavedReview: (req: HandleSavedReviewRequest) => void;
  firstRenderRef: React.MutableRefObject<boolean>;
}
