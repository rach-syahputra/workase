import {
  AddCompanyReviewRequest,
  GetCompaniesReviewsRequest,
  GetCompanyHeaderRequest,
  GetCompanyRatingRequest,
  GetCompanyReviewsRequest,
  VerifyUserEmploymentRequest,
} from '../interfaces/company-review.interface';
import AddCompanyReviewRepository from '../repositories/company-reviews/add-company-review.repository';
import GetCompanyReviewRepository from '../repositories/company-reviews/get-company-review.repository';
import { addCompanyReviewSchema } from '../validations/company-review.validation';
import GetCompanyRatingRepository from '../repositories/company-reviews/get-company-rating.repository';
import GetCompanyHeaderRepository from '../repositories/company-reviews/get-company-header.repository';

import { ResponseError } from '../helpers/error';
import { validate } from '../helpers/validation';

class CompanyReviewService {
  private addCompanyReviewRepository: AddCompanyReviewRepository;
  private getCompanyHeaderRepository: GetCompanyHeaderRepository;
  private getCompanyRatingRepository: GetCompanyRatingRepository;
  private getCompanyReviewRepository: GetCompanyReviewRepository;

  constructor() {
    this.addCompanyReviewRepository = new AddCompanyReviewRepository();
    this.getCompanyHeaderRepository = new GetCompanyHeaderRepository();
    this.getCompanyRatingRepository = new GetCompanyRatingRepository();
    this.getCompanyReviewRepository = new GetCompanyReviewRepository();
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
    return this.getCompanyReviewRepository.getCompanyReviews(req);
  };

  getCompaniesReviews = async (req: GetCompaniesReviewsRequest) => {
    return this.getCompanyReviewRepository.getCompaniesReviews(req);
  };
}

export default CompanyReviewService;
