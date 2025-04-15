import { Router } from 'express';

import UserAssessmentController from '@/controllers/user-assessment.controller';

class UserAssessmentRouter {
  private router: Router;
  private userAssessmentController: UserAssessmentController;

  constructor() {
    this.router = Router();
    this.userAssessmentController = new UserAssessmentController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.userAssessmentController.addUserAssessment);
    this.router.post(
      '/:userAssessmentId/result',
      this.userAssessmentController.calculateAssessmentResult,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default UserAssessmentRouter;
