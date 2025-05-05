import { Dispatch, SetStateAction } from 'react';

import { ICompanyReview } from '@/lib/interfaces/company-review';
import { ICurrentCompany } from '@/lib/interfaces/user-stats';

export interface IOption {
  isLoadMore: boolean;
}

export interface ICompaniesReviewsContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  reviews: ICompanyReview[];
  setReviews: Dispatch<SetStateAction<ICompanyReview[]>>;
  fetchCompaniesReviews: (option?: IOption) => void;
  firstRenderRef: React.MutableRefObject<boolean>;
  userCurrentCompanies: ICurrentCompany[];
}
