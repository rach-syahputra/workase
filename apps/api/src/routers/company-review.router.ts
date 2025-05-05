import { Router } from 'express';

import CompanyReviewController from '../controllers/company-review.controller';
import SavedReviewController from '../controllers/saved-review.controller';
import { verifyUser } from '../middlewares/auth.middleware';

class CompanyReviewRouter {
  private router: Router;
  private companyReviewController: CompanyReviewController;
  private savedReviewController: SavedReviewController;

  constructor() {
    this.companyReviewController = new CompanyReviewController();
    this.savedReviewController = new SavedReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/reviews',
      this.companyReviewController.getCompaniesReviews,
    );
    this.router.get(
      '/:slug/header',
      this.companyReviewController.getCompanyHeader,
    );
    this.router.get(
      '/:slug/rating',
      this.companyReviewController.getCompanyRating,
    );
    this.router.post(
      '/:companyId/reviews',
      verifyUser,
      this.companyReviewController.addCompanyReview,
    );
    this.router.get(
      '/:slug/reviews',
      this.companyReviewController.getCompanyReviews,
    );
    this.router.post(
      '/:slug/reviews/:companyReviewId/bookmark',
      verifyUser,
      this.savedReviewController.addSavedReview,
    );
    this.router.delete(
      '/:slug/reviews/:companyReviewId/bookmark',
      verifyUser,
      this.savedReviewController.removeSavedReview,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default CompanyReviewRouter;
