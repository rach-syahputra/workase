import { ApiResponse } from '@/helpers/api-response';
import { UserRequest } from '@/interfaces/middleware.interface';
import savedJobsService from '@/services/saved-jobs.service';
import { NextFunction, Response } from 'express';

class savedJobsController {
  async saveJob(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await savedJobsService.saveJob(req);
      ApiResponse({
        res,
        statusCode: 201,
        message: 'job saved',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async unsaveJob(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await savedJobsService.unsaveJob(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'job unsaved',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getSavedJobs(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await savedJobsService.getSavedJobs(req);
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
export default new savedJobsController();
