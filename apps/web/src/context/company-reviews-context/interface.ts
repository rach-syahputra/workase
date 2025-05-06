import { Dispatch, SetStateAction } from 'react';

import { ICompanyReview } from '@/lib/interfaces/company-review';
import { OrderType } from '@/lib/interfaces/api-request/filter';

export interface IOption {
  isLoadMore: boolean;
  cursor: string;
}

export interface HandleSavedReviewRequest {
  companyReviewId: string;
  companySlug: string;
  action: 'ADD' | 'REMOVE';
}

export interface ICompanyReviewsContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  order: OrderType;
  reviews: ICompanyReview[];
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setReviews: Dispatch<SetStateAction<ICompanyReview[]>>;
  fetchGetCompanyReviews: (option?: IOption) => void;
  handleSavedReview: (req: HandleSavedReviewRequest) => void;
  firstRenderRef: React.MutableRefObject<boolean>;
  renderWithQ: React.MutableRefObject<boolean>;
  slug: string;
}
