import { Router } from 'express';

import {
  uploadAssessmentImage,
  uploadAssessmentQuestionImage,
} from '@/helpers/multer';
import AssessmentController from '@/controllers/assessment.controller';
import { verifyDeveloper } from '@/middlewares/auth.middleware';

class AssessmentRouter {
  private router: Router;
  private assessmentController: AssessmentController;

  constructor() {
    this.router = Router();
    this.assessmentController = new AssessmentController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyDeveloper,
      this.assessmentController.getAssessments,
    );
    this.router.get(
      '/:assessmentId',
      verifyDeveloper,
      this.assessmentController.getAssessmentById,
    );
    this.router.get(
      '/skills/available',
      verifyDeveloper,
      this.assessmentController.getAvailableSkills,
    );
    this.router.post(
      '/',
      verifyDeveloper,
      uploadAssessmentImage.single('image'),
      this.assessmentController.addAssessment,
    );
    this.router.get(
      '/:assessmentId/questions',
      verifyDeveloper,
      this.assessmentController.getAssessmentQuestions,
    );
    this.router.post(
      '/:assessmentId/questions',
      verifyDeveloper,
      uploadAssessmentQuestionImage.single('image'),
      this.assessmentController.addAssessmentQuestion,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default AssessmentRouter;
