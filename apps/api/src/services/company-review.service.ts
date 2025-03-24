import {
  AddCompanyReviewRequest,
  VerifyUserEmploymentRequest,
} from '@/interfaces/company-review.interface';
import CompanyReviewRepository from '@/repositories/company-review.repository';
import { addCompanyReviewSchema } from '@/validations/company-review.validation';
import { ResponseError } from '@/helpers/error';
import { validate } from '@/helpers/validation';

class CompanyReviewService {
  private companyReviewRepository: CompanyReviewRepository;

  constructor() {
    this.companyReviewRepository = new CompanyReviewRepository();
  }

  verifyUserEmployment = async (req: VerifyUserEmploymentRequest) => {
    const isUserVerified =
      await this.companyReviewRepository.verifyUserEmployment(req);

    if (!isUserVerified) {
      throw new ResponseError(400, 'User does not belong to the company');
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

    return this.companyReviewRepository.addCompanyReview({
      userId: req.userId,
      jobId: req.jobId,
      companyId: req.companyId,
      content: req.content,
      rating: req.rating,
      salaryEstimate: req.salaryEstimate,
      title: req.title,
    });
  };
}

export default CompanyReviewService;
