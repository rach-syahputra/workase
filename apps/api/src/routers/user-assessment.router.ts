import { Router } from 'express';

import UserAssessmentController from '../controllers/user-assessment.controller';
import { verifyUser } from '../middlewares/auth.middleware';

class UserAssessmentRouter {
  private router: Router;
  private userAssessmentController: UserAssessmentController;

  constructor() {
    this.router = Router();
    this.userAssessmentController = new UserAssessmentController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      verifyUser,
      this.userAssessmentController.addUserAssessment,
    );
    this.router.get(
      '/',
      verifyUser,
      this.userAssessmentController.getUserAssessments,
    );
    this.router.post(
      '/:userAssessmentId/result',
      verifyUser,
      this.userAssessmentController.calculateAssessmentResult,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default UserAssessmentRouter;
