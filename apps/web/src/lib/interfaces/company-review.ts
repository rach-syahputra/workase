export interface ICompanyHeader {
  id: string;
  name: string;
  logoUrl: string;
}

export interface ICompanyRating {
  overall: number;
  workCulture: number;
  workLifeBalance: number;
  facilities: number;
  careerGrowth: number;
  percentage: {
    star: {
      one: number;
      two: number;
      three: number;
      four: number;
      five: number;
    };
    category: {
      workCulture: number;
      workLifeBalance: number;
      facilities: number;
      careerGrowth: number;
    };
  };
}

export interface ICompanyReview {
  id: string;
  title: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogoUrl: string;
  salaryEstimate: number;
  content: string;
  isDeleted: boolean;
  rating: ICompanyReviewRating;
  createdAt: string;
}

interface ICompanyReviewRating {
  id: string;
  companyReviewId: string;
  overallRating: number;
  workCulture: number;
  workLifeBalance: number;
  facilities: number;
  careerGrowth: number;
}
