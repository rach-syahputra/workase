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
