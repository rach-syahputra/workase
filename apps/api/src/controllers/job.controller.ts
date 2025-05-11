<<<<<<< HEAD
import { ApiResponse } from '../helpers/api-response';
import jobsService from '../services/job.service';
=======
import { ApiResponse } from '@/helpers/api-response';
import { UserRequest } from '@/interfaces/middleware.interface';
import jobsService from '@/services/job.service';
>>>>>>> 178cd18 (feat: complete all core features for initial release)
import { NextFunction, Request, Response } from 'express';

class JobsController {
  async getJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await jobsService.getJobs(req);
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

  async getJobBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await jobsService.getJobBySlug(req);
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

export default new JobsController();
