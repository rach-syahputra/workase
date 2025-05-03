import { NextFunction, Request, Response } from 'express';

import AssessmentService from '@/services/assessment.service';
import {
  AddAssessmentQuestionBodyRequest,
  AssessmentSortType,
} from '@/interfaces/assessment.interface';
import {
  DeveloperRequest,
  UserAndDeveloperRequest,
  UserRequest,
} from '@/interfaces/middleware.interface';
import { OrderType } from '@/interfaces/filter.interface';
import { ApiResponse } from '@/helpers/api-response';
import { ResponseError } from '@/helpers/error';

class AssessmentController {
  private assessmentService: AssessmentService;

  constructor() {
    this.assessmentService = new AssessmentService();
  }

  getAssessments = async (
    req: UserAndDeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user && !req.developer)
        throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.getAssessments({
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        order: req.query.order as OrderType,
        skill: req.query.skill as string,
        sortBy: req.query.sortBy as AssessmentSortType,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Assessments retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getAssessmentDiscovery = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.getAssessmentDisovery({
        userId: req.user.id,
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        order: req.query.order as OrderType,
        skill: req.query.skill as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Assessments retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getAssessmentBySlug = async (
    req: UserAndDeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user && !req.developer)
        throw new ResponseError(401, 'Unauthenticated');

      const data = await this.assessmentService.getAssessmentBySlug({
        slug: req.params.slug,
        userId: req.user?.id!,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Assessment detail retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getAvailableSkills = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.getAvailableSkills({
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        title: req.query.title as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Available skills retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  addAssessment = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const body = req.body;
      const data = await this.assessmentService.addAssessment({
        skillId: body.skillId,
        image: req.file,
        shortDescription: body.shortDescription,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Assessment created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getTopAssessments = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.assessmentService.getTopAssessments();

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Top assessments retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AssessmentController;
