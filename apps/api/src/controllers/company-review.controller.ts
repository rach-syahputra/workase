import { NextFunction, Request, Response } from 'express';

import CompanyReviewService from '../services/company-review.service';

import { UserRequest } from '../interfaces/middleware.interface';
import { AddCompanyReviewRequest } from '../interfaces/company-review.interface';
import { OrderType } from '../interfaces/filter.interface';

import { ApiResponse } from '../helpers/api-response';
import { ResponseError } from '../helpers/error';

class CompanyReviewController {
  private companyReviewService: CompanyReviewService;

  constructor() {
    this.companyReviewService = new CompanyReviewService();
  }

  addCompanyReview = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const body = req.body as AddCompanyReviewRequest;
      const data = await this.companyReviewService.addCompanyReview({
        userId: req.user.id,
        jobId: req.user.jobId,
        companyId: req.params.companyId,
        content: body.content,
        rating: {
          workCulture: Number(body.rating.workCulture),
          workLifeBalance: Number(body.rating.workLifeBalance),
          facilities: Number(body.rating.facilities),
          careerGrowth: Number(body.rating.careerGrowth),
        },
        salaryEstimate: Number(body.salaryEstimate),
        title: body.title,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Company review created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCompanyHeader = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.companyReviewService.getCompanyHeader({
        slug: req.params.slug,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: `Company header with id ${req.params.companyId} retrieved successfully.`,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCompanyRating = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.companyReviewService.getCompanyRating({
        slug: req.params.slug,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: `Rating for company with slug ${req.params.slug} retrieved successfully.`,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCompanyReviews = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.companyReviewService.getCompanyReviews({
        slug: req.params.slug,
        order: req.query.order as OrderType,
        cursor: req.query.cursor as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        userId: req.query.userId as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: `Reviews for company with id ${req.params.companyId} retrieved successfully.`,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCompaniesReviews = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.companyReviewService.getCompaniesReviews({
        q: req.query.q as string,
        order: req.query.order as OrderType,
        cursor: req.query.cursor as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        userId: req.query.userId as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: `Companies's Reviews with name or job title containing '${req.query.q || ''}' retrieved successfully.`,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
export default CompanyReviewController;
