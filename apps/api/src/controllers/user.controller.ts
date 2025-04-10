import { responseHandler } from '@/helpers/response.handler';
import { NextFunction, Response } from 'express';
import { Request } from 'express';

import usersService from '@/services/user.service';
class UsersController {
  async addUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.addUsers(req);
      responseHandler(res, 'post succes', result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
