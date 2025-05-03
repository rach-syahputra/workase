import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '../helpers/api-response';
import DeveloperService from '../services/developer.service';

class DeveloperController {
  private developerService: DeveloperService;

  constructor() {
    this.developerService = new DeveloperService();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.developerService.login({
        email: req.body.email,
        password: req.body.password,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Developer logged in successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default DeveloperController;
