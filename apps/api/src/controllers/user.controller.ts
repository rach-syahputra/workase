import { responseHandler } from '@/helpers/response.handler';
import { NextFunction, Response } from 'express';
import { Request } from 'express';

import usersService from '@/services/user.service';
import { ApiResponse } from '@/helpers/api-response';
class UsersController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('ini req.body', req.body);
      const result = await usersService.register(req.body);
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
      const result = await usersService.login(req);
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

export default new UsersController();
