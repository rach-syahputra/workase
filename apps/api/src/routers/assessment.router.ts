import { Router } from 'express';

import {
  uploadAssessmentImage,
  uploadAssessmentQuestionImage,
} from '@/helpers/multer';
import AssessmentController from '@/controllers/assessment.controller';
import AssessmentQuestionController from '@/controllers/assessment-question.controller';
import {
  verifyDeveloper,
  verifyUser,
  verifyUserAndDeveloper,
} from '@/middlewares/auth.middleware';

class AssessmentRouter {
  private router: Router;
  private assessmentController: AssessmentController;
  private assessmentQuestionController: AssessmentQuestionController;

  constructor() {
    this.router = Router();
    this.assessmentController = new AssessmentController();
    this.assessmentQuestionController = new AssessmentQuestionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyDeveloper,
      this.assessmentController.getAssessments,
    );
    this.router.get(
      '/discovery',
      verifyUser,
      this.assessmentController.getAssessmentDiscovery,
    );
    this.router.get(
      '/:slug',
      verifyUser,
      this.assessmentController.getAssessmentBySlug,
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
      '/:slug/questions',
      verifyUserAndDeveloper,
      this.assessmentQuestionController.getAssessmentQuestions,
    );
    this.router.post(
      '/:assessmentId/questions',
      verifyDeveloper,
      uploadAssessmentQuestionImage.single('image'),
      this.assessmentQuestionController.addAssessmentQuestion,
    );
    this.router.delete(
      '/:assessmentId/questions/:assessmentQuestionId',
      verifyDeveloper,
      this.assessmentQuestionController.deleteAssessmentQuestion,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default AssessmentRouter;
