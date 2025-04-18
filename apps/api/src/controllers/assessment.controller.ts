import { NextFunction, Response } from 'express';

import AssessmentService from '@/services/assessment.service';
import {
  AddAssessmentQuestionBodyRequest,
  AssessmentSortType,
} from '@/interfaces/assessment.interface';
import { DeveloperRequest } from '@/interfaces/middleware.interface';
import { OrderType } from '@/interfaces/filter.interface';
import { ApiResponse } from '@/helpers/api-response';
import { ResponseError } from '@/helpers/error';

class AssessmentController {
  private assessmentService: AssessmentService;

  constructor() {
    this.assessmentService = new AssessmentService();
  }

  getAssessments = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

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
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.getAssessmentDisovery({
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
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.getAssessmentBySlug({
        slug: req.params.slug,
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

  getAssessmentQuestions = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.assessmentService.getAssessmentQuestions({
        slug: req.params.slug,
        limit: Number(req.query.limit),
        page: Number(req.query.page),
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
}

export default AssessmentController;
