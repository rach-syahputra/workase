import { NextFunction, Response } from 'express';

import AssessmentService from '../services/assessment.service';
import { AddAssessmentQuestionBodyRequest } from '../interfaces/assessment.interface';
import {
  DeveloperRequest,
  UserAndDeveloperRequest,
} from '../interfaces/middleware.interface';
import { OrderType } from '../interfaces/filter.interface';
import { ApiResponse } from '../helpers/api-response';
import { ResponseError } from '../helpers/error';

class AssessmentQuestionController {
  private assessmentService: AssessmentService;

  constructor() {
    this.assessmentService = new AssessmentService();
  }

  getAssessmentQuestions = async (
    req: UserAndDeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user && !req.developer)
        throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.getAssessmentQuestions({
        slug: req.params.slug,
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        order: req.query.order as OrderType,
        question: req.query.question as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Assessment questions retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  addAssessmentQuestion = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const body = req.body as AddAssessmentQuestionBodyRequest;
      const data = await this.assessmentService.addAssessmentQuestion({
        assessmentId: req.params.assessmentId,
        question: body.question,
        image: req.file,
        options: body.options.map((option) => ({
          text: option.text,
          isCorrect: Number(option.isCorrect) === 0 ? false : true,
        })),
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Assessment question created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteAssessmentQuestion = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.deleteAssessmentQuestion({
        assessmentId: req.params.assessmentId,
        assessmentQuestionId: req.params.assessmentQuestionId,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Assessment question deleted successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AssessmentQuestionController;
