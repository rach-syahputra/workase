import {
  ICompanyHeader,
  ICompanyRating,
  ICompanyReview,
  ISearchCompanyReview,
} from '../company-review';
import { APIResponse, IPagination } from './response';

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
  pagination: IPagination;
}

export interface SearchCompanyReviewsData {
  companies: ISearchCompanyReview[];
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

<<<<<<< HEAD
export interface GetCompaniesReviewsResponse extends APIResponse {
  data?: GetCompanyReviewData;
}

=======
>>>>>>> 80e554f (feat(web): implement search company reviews)
export interface SearchCompanyReviewsResponse extends APIResponse {
  data?: SearchCompanyReviewsData;
}
