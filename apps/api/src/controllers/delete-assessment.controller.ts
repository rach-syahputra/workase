import { NextFunction, Response } from 'express';

import AssessmentService from '../services/assessment.service';
import { DeveloperRequest } from '../interfaces/middleware.interface';
import { ApiResponse } from '../helpers/api-response';
import { ResponseError } from '../helpers/error';

class DeleteAssessmentController {
  private assessmentService: AssessmentService;

  constructor() {
    this.assessmentService = new AssessmentService();
  }

  deleteAssessment = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.assessmentService.deleteAssessment({
        assessmentId: req.params.assessmentId,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Assessment deleted successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default DeleteAssessmentController;
