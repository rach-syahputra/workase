import { Router } from 'express';

import CompanyReviewController from '@/controllers/company-review.controller';
import { verifyUser } from '@/middlewares/auth.middleware';

class CompanyReviewRouter {
  private router: Router;
  private companyReviewController: CompanyReviewController;

  constructor() {
    this.companyReviewController = new CompanyReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/reviews',
      this.companyReviewController.getCompaniesReviews,
    );
    this.router.get(
      '/:companyId/header',
      this.companyReviewController.getCompanyHeader,
    );
    this.router.get(
      '/:companyId/rating',
      this.companyReviewController.getCompanyRating,
    );
    this.router.post(
      '/:companyId/reviews',
      verifyToken,
      this.companyReviewController.addCompanyReview,
    );
    this.router.get(
      '/:companyId/reviews',
      this.companyReviewController.getCompanyReviews,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default CompanyReviewRouter;
