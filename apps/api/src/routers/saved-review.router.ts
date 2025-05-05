import { Router } from 'express';

import { verifyUser } from '../middlewares/auth.middleware';
import SavedReviewController from '../controllers/saved-review.controller';

class SavedReviewRouter {
  private router: Router;
  private savedReviewController: SavedReviewController;

  constructor() {
    this.savedReviewController = new SavedReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyUser,
      this.savedReviewController.getSavedReviews,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SavedReviewRouter;
