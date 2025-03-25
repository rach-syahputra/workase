import { APIResponse } from './response';

export interface CompanyReview {
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

export interface AddCompanyReviewResponse extends APIResponse {
  data?: CompanyReview;
}
