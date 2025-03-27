import {
  AddCompanyReviewRequest,
  GetCompaniesReviewsRequest,
  GetCompanyRatingRequest,
  GetCompanyReviewsRequest,
  VerifyUserEmploymentRequest,
} from '@/interfaces/company-review.interface';
import AddCompanyReviewRepository from '@/repositories/company-reviews/add-company-review.repository';
import GetCompanyReviewRepository from '@/repositories/company-reviews/get-company-review.repository';
import { addCompanyReviewSchema } from '@/validations/company-review.validation';
import { ResponseError } from '@/helpers/error';
import { validate } from '@/helpers/validation';
import GetCompanyRatingRepository from '@/repositories/company-reviews/get-company-rating.repository';

class CompanyReviewService {
  private addCompanyReviewRepository: AddCompanyReviewRepository;
  private getCompanyReviewRepository: GetCompanyReviewRepository;
  private getCompanyRatingRepository: GetCompanyRatingRepository;

  constructor() {
    this.addCompanyReviewRepository = new AddCompanyReviewRepository();
    this.getCompanyReviewRepository = new GetCompanyReviewRepository();
    this.getCompanyRatingRepository = new GetCompanyRatingRepository();
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
