import { NextFunction, Request, Response } from 'express';

import SearchCompanyReviewService from '../services/search-company-review.service';
import { ApiResponse } from '../helpers/api-response';

class SearchCompanyReviewController {
  private searchCompanyReviewService: SearchCompanyReviewService;

  constructor() {
    this.searchCompanyReviewService = new SearchCompanyReviewService();
  }

  searchCompanyReviews = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.searchCompanyReviewService.searchCompanyReviews({
        q: req.query.q as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: `Search company reviews with query containing '${req.query.q}' retrieved successfully.`,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default SearchCompanyReviewController;
