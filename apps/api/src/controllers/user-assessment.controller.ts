import { NextFunction, Response } from 'express';

import { ApiResponse } from '../helpers/api-response';
import UserAssessmentService from '../services/user-assessment.service';
import { OrderType } from '../interfaces/filter.interface';
import { UserRequest } from '../interfaces/middleware.interface';
import { ResponseError } from '../helpers/error';

class UserAssessmentController {
  private userAssessmentService: UserAssessmentService;

  constructor() {
    this.userAssessmentService = new UserAssessmentService();
  }

  addUserAssessment = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.userAssessmentService.addUserAssessment({
        userId: req.user.id,
        assessment: {
          id: req.body.assessment.id,
          slug: req.body.assessment.slug,
        },
        subscriptionId: req.body.subscriptionId,
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
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

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

  getUserAssessments = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.userAssessmentService.getUserAssessments({
        userId: req.user.id,
        limit: Number(req.query.limit),
        order: req.query.order as OrderType,
        skill: req.query.skill as string,
        page: Number(req.query.page),
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'User assessments retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default UserAssessmentController;
