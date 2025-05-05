import { IFilter } from './filter';

export interface AddCompanyReviewRequest {
  companyId: string;
  title: string;
  salaryEstimate: number;
  rating: {
    workCulture: number;
    workLifeBalance: number;
    facilities: number;
    careerGrowth: number;
  };
  content: string;
}

export interface GetCompaniesReviewsRequest extends IFilter {}

export interface AddSavedReviewRequest {
  companyReviewId: string;
  companySlug: string;
}

export interface RemoveSavedReviewRequest {
  companyReviewId: string;
  companySlug: string;
}

export interface GetSavedReviewsRequest extends IFilter {}
