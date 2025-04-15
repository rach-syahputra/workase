import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '@/helpers/api-response';
import UserAssessmentService from '@/services/user-assessment.service';

class UserAssessmentController {
  private userAssessmentService: UserAssessmentService;

  constructor() {
    this.userAssessmentService = new UserAssessmentService();
  }

  addUserAssessment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // TO DO: verify user token
      const data = await this.userAssessmentService.addUserAssessment({
        userId: req.body.userId,
        assessmentId: req.body.assessmentId,
        score: req.body.score,
        status: req.body.status,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'User assessment created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  calculateAssessmentResult = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // TO DO: verify user token
      const data = await this.userAssessmentService.calculateAssessmentResult({
        userAssessmentId: req.params.userAssessmentId,
        assessmentAnswers: req.body.assessmentAnswers,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'User assessment result created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default UserAssessmentController;
