import { responseHandler } from '@/helpers/response.handler';
import { NextFunction, Response } from 'express';
import { Request } from 'express';
import companiesService from '@/services/company.service';
import { ApiResponse } from '@/helpers/api-response';
class CompaniesController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.register(req);
      ApiResponse({
        res,
        statusCode: 201,
        message: 'register succes',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.login(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'login succes',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CompaniesController();
