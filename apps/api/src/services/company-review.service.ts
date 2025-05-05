import {
  AddCompanyReviewRequest,
  AddSavedReviewRequest,
  GetCompaniesReviewsRequest,
  GetCompanyHeaderRequest,
  GetCompanyRatingRequest,
  GetCompanyReviewsRequest,
  GetSavedReviewsRequest,
  VerifyUserEmploymentRequest,
} from '../interfaces/company-review.interface';
import { addCompanyReviewSchema } from '../validations/company-review.validation';
import AddCompanyReviewRepository from '../repositories/company-reviews/add-company-review.repository';
import GetCompanyReviewRepository from '../repositories/company-reviews/get-company-review.repository';
import GetCompanyRatingRepository from '../repositories/company-reviews/get-company-rating.repository';
import GetCompanyHeaderRepository from '../repositories/company-reviews/get-company-header.repository';

import { ResponseError } from '../helpers/error';
import { validate } from '../helpers/validation';
import SavedReviewRepository from '../repositories/company-reviews/saved-review.repository';

class CompanyReviewService {
  private addCompanyReviewRepository: AddCompanyReviewRepository;
  private getCompanyHeaderRepository: GetCompanyHeaderRepository;
  private getCompanyRatingRepository: GetCompanyRatingRepository;
  private getCompanyReviewRepository: GetCompanyReviewRepository;
  private savedReviewRepository: SavedReviewRepository;

  constructor() {
    this.addCompanyReviewRepository = new AddCompanyReviewRepository();
    this.getCompanyHeaderRepository = new GetCompanyHeaderRepository();
    this.getCompanyRatingRepository = new GetCompanyRatingRepository();
    this.getCompanyReviewRepository = new GetCompanyReviewRepository();
    this.savedReviewRepository = new SavedReviewRepository();
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
    return await this.getCompanyHeaderRepository.getCompanyHeader(req);
  };

  getCompanyRating = async (req: GetCompanyRatingRequest) => {
    return await this.getCompanyRatingRepository.getCompanyRating(req);
  };

  getCompanyReviews = async (req: GetCompanyReviewsRequest) => {
    return await this.getCompanyReviewRepository.getCompanyReviews(req);
  };

  getCompaniesReviews = async (req: GetCompaniesReviewsRequest) => {
    return await this.getCompanyReviewRepository.getCompaniesReviews(req);
  };

  addSavedReview = async (req: AddSavedReviewRequest) => {
    return await this.savedReviewRepository.addSavedReview(req);
  };

  removeSavedReview = async (req: AddSavedReviewRequest) => {
    return await this.savedReviewRepository.removeSavedReview(req);
  };

  getSavedReviews = async (req: GetSavedReviewsRequest) => {
    return await this.savedReviewRepository.getSavedReviews(req);
  };
}

export default CompanyReviewService;
