import {
  IAddSavedReview,
  ICompanyHeader,
  ICompanyRating,
  ICompanyReview,
  ISavedReview,
  ISearchCompanyReview,
} from '../company-review';
import { APIResponse, ICursorPagination, IPagination } from './response';

export interface AddCompanyReviewData {
  id: string;
  title: string;
  jobTitle: string;

  salaryEstimate: number;
  rating: {
    workCulture: number;
    workLifeBalance: number;
    facilities: number;
    careerGrowth: number;
  };
  content: string;

  createdAt: string;
  isDeleted: boolean;
}

export interface GetCompanyHeaderData {
  company: ICompanyHeader;
}

export interface GetCompanyRatingData {
  rating: ICompanyRating;
  totalReviews: number;
}

export interface GetCompanyReviewData {
  reviews: ICompanyReview[];
  pagination: ICursorPagination;
}

export interface SearchCompanyReviewsData {
  companies: ISearchCompanyReview[];
}

export interface AddCompanyReviewResponse extends APIResponse {
  data?: AddCompanyReviewData;
}

export interface GetCompanyHeaderResponse extends APIResponse {
  data?: GetCompanyHeaderData;
}

export interface GetCompanyRatingResponse extends APIResponse {
  data?: GetCompanyRatingData;
}

export interface GetCompanyReviewsResponse extends APIResponse {
  data?: GetCompanyReviewData;
}

export interface GetCompaniesReviewsResponse extends APIResponse {
  data?: GetCompanyReviewData;
}

export interface SearchCompanyReviewsResponse extends APIResponse {
  data?: SearchCompanyReviewsData;
}

export interface AddSavedReviewResponse extends APIResponse {
  data?: {
    savedReview: IAddSavedReview;
  };
}

export interface RemoveSavedReviewResponse extends APIResponse {}

export interface GetSavedReviewsResponse extends APIResponse {
  data?: {
    savedReviews: ISavedReview[];
    pagination: IPagination;
  };
}
