import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '@/helpers/api-response';
import UserAssessmentService from '@/services/user-assessment.service';
import { OrderType } from '@/interfaces/filter.interface';

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
        assessment: {
          id: req.body.assessment.id,
          slug: req.body.assessment.slug,
        },
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

  getUserAssessments = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // TO DO: verify user token
      const data = await this.userAssessmentService.getUserAssessments({
        userId: 'ndy-01',
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
