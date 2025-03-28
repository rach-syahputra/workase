import {
  ICompanyHeader,
  ICompanyRating,
  ICompanyReview,
} from '../company-review';
import { APIResponse } from './response';

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
