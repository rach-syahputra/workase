import {
  AddCompanyReviewRequest,
  GetCompaniesReviewsRequest,
<<<<<<< HEAD
  GetCompanyHeaderRequest,
  GetCompanyRatingRequest,
=======
>>>>>>> 283fb81 (feat(api): add Get Companies Reviews API)
  GetCompanyReviewsRequest,
  VerifyUserEmploymentRequest,
} from '@/interfaces/company-review.interface';
import CompanyReviewRepository from '@/repositories/company-review.repository';
import { addCompanyReviewSchema } from '@/validations/company-review.validation';
import GetCompanyRatingRepository from '@/repositories/company-reviews/get-company-rating.repository';
import GetCompanyHeaderRepository from '@/repositories/company-reviews/get-company-header.repository';

import { ResponseError } from '@/helpers/error';
import { validate } from '@/helpers/validation';

class CompanyReviewService {
  private companyReviewRepository: CompanyReviewRepository;

  constructor() {
    this.companyReviewRepository = new CompanyReviewRepository();
  }

  verifyUserEmployment = async (req: VerifyUserEmploymentRequest) => {
    const isUserVerified =
      await this.addCompanyReviewRepository.verifyUserEmployment(req);

    if (!isUserVerified) {
      throw new ResponseError(403, 'User does not belong to the company');
    }
  };

  addCompanyReview = async (req: AddCompanyReviewRequest) => {
    validate(addCompanyReviewSchema, {
      companyId: req.companyId,
      content: req.content,
      rating: req.rating,
      salaryEstimate: req.salaryEstimate,
      title: req.title,
    });

    await this.verifyUserEmployment({
      userId: req.userId,
      jobId: req.jobId,
      companyId: req.companyId,
    });

    return this.addCompanyReviewRepository.addCompanyReview({
      userId: req.userId,
      jobId: req.jobId,
      companyId: req.companyId,
      content: req.content,
      rating: req.rating,
      salaryEstimate: req.salaryEstimate,
      title: req.title,
    });
  };

  getCompanyHeader = async (req: GetCompanyHeaderRequest) => {
    return this.getCompanyHeaderRepository.getCompanyHeader({
      companyId: req.companyId,
    });
  };

  getCompanyRating = async (req: GetCompanyRatingRequest) => {
    return this.getCompanyRatingRepository.getCompanyRating({
      companyId: req.companyId,
    });
  };

  getCompanyReviews = async (req: GetCompanyReviewsRequest) => {
    return this.companyReviewRepository.getCompanyReviews(req);
  };

  getCompaniesReviews = async (req: GetCompaniesReviewsRequest) => {
    return this.getCompanyReviewRepository.getCompaniesReviews(req);
  };
}

export default CompanyReviewService;
