import { Router } from 'express';

import SearchCompanyReviewController from '@/controllers/search-company-review.controller';

class SearchCompanyReviewRouter {
  private router: Router;
  private searchCompanyReviewController: SearchCompanyReviewController;

  constructor() {
    this.searchCompanyReviewController = new SearchCompanyReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/companies/reviews',
      this.searchCompanyReviewController.searchCompanyReviews,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SearchCompanyReviewRouter;
