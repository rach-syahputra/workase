import { NextFunction, Response } from 'express';

import CompanyReviewService from '../services/company-review.service';

import { UserRequest } from '../interfaces/middleware.interface';

import { ApiResponse } from '../helpers/api-response';
import { ResponseError } from '../helpers/error';
import { OrderType } from 'src/interfaces/filter.interface';

class SavedReviewController {
  private companyReviewService: CompanyReviewService;

  constructor() {
    this.companyReviewService = new CompanyReviewService();
  }

  addSavedReview = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.companyReviewService.addSavedReview({
        companyReviewId: req.params.companyReviewId,
        userId: req.user.id,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Company review saved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  removeSavedReview = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.companyReviewService.removeSavedReview({
        companyReviewId: req.params.companyReviewId,
        userId: req.user.id,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Company review unsaved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getSavedReviews = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.companyReviewService.getSavedReviews({
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        order: req.query.order as OrderType,
        userId: req.user.id,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Saved reviews retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
export default SavedReviewController;
