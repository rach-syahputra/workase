import { IFilter } from './filter.interface';

export interface CompanyReviewRating {
  overallRating?: number;

  workCulture: number;
  workLifeBalance: number;
  facilities: number;
  careerGrowth: number;
}

export interface AddCompanyReviewRequest {
  jobId: string;
  userId: string;
  companyId: string;
  title: string;
  salaryEstimate: number;
  rating: CompanyReviewRating;
  content: string;
}

export interface AddCompanyReviewRequestTest {
  companyId: string;
  title: string;
  salaryEstimate: number;
  rating: CompanyReviewRating;
  content: string;
}

export interface VerifyUserEmploymentRequest {
  userId: string;
  jobId: string;
  companyId: string;
}

export interface GetCompanyHeaderRequest {
  slug: string;
}

export interface GetCompanyRatingRequest {
  slug: string;
}

export interface GetCompanyReviewsRequest extends IFilter {
  userId?: string;
  slug: string;
}

export interface GetCompaniesReviewsRequest extends IFilter {
  userId?: string;
  q: string;
}

export interface AddSavedReviewRequest {
  companyReviewId: string;
  userId: string;
}

export interface RemoveSavedReviewRequest {
  companyReviewId: string;
  userId: string;
}

export interface GetSavedReviewsRequest extends IFilter {
  userId: string;
}
