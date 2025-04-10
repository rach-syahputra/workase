import { responseHandler } from '@/helpers/response.handler';
import { NextFunction, Response } from 'express';
import { Request } from 'express';
import companiesService from '@/services/company.service';
class CompaniesController {
  async addCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.addCompanies(req);
      responseHandler(res, 'post succes', result);
    } catch (error) {
      next(error);
    }
  }
}

export default new CompaniesController();
