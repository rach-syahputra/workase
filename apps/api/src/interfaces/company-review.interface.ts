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
  companyId: string;
}

export interface GetCompanyRatingRequest {
  companyId: string;
}

export interface GetCompanyReviewsRequest extends IFilter {
  companyId: string;
}

export interface GetCompaniesReviewsRequest extends IFilter {
  q: string;
}
