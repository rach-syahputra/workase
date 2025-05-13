import { ApiResponse } from '../helpers/api-response';
import { UserRequest } from '../interfaces/middleware.interface';
import jobAplicationsService from '../services/job-applications.service';
import { NextFunction, Response } from 'express';

class jobAplicationsController {
  async applyJob(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await jobAplicationsService.applyJob(req);
      ApiResponse({
        res,
        statusCode: 201,
        message: 'application successful created',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobApplications(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await jobAplicationsService.getJobApplications(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'fetching succes',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobApplicationById(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await jobAplicationsService.getJobApplicationById(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'fetching succes',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new jobAplicationsController();
