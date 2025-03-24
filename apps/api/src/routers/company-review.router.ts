import { Router } from 'express';

import CompanyReviewController from '@/controllers/company-review.controller';
import { verifyToken } from '@/middlewares/user.middleware';

class CompanyReviewRouter {
  private router: Router;
  private companyReviewController: CompanyReviewController;

  constructor() {
    this.companyReviewController = new CompanyReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/:companyId/reviews',
      verifyToken,
      this.companyReviewController.addCompanyReview,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default CompanyReviewRouter;
