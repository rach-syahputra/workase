import { responseHandler } from '@/helpers/response.handler';
import jobsService from '@/services/jobs.service';
import { NextFunction, Request, Response } from 'express';

class JobsController {
  async getJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await jobsService.getJobs(req);
      responseHandler(res, 'fetching succes', result);
    } catch (error) {
      next(error);
    }
  }
}

export default new JobsController();
