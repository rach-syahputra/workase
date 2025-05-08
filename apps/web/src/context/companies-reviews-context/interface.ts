import { Dispatch, SetStateAction } from 'react';

import { ICompanyReview } from '@/lib/interfaces/company-review';
import { ICurrentCompany } from '@/lib/interfaces/user-stats';
import { OrderType } from '@/lib/interfaces/api-request/filter';

export interface IOption {
  isLoadMore: boolean;
  cursor: string;
}

export interface ICompaniesReviewsContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  order: OrderType;
  reviews: ICompanyReview[];
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setReviews: Dispatch<SetStateAction<ICompanyReview[]>>;
  fetchCompaniesReviews: (option?: IOption) => void;
  firstRenderRef: React.MutableRefObject<boolean>;
  renderWithQ: React.MutableRefObject<boolean>;
  userCurrentCompanies: ICurrentCompany[];
}
