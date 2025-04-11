import { responseHandler } from '@/helpers/response.handler';
import { NextFunction, Response } from 'express';
import { Request } from 'express';

import usersService from '@/services/user.service';
import developerService from '@/services/developer.service';
class DeveloperController {
  async addDevelopers(req: Request, res: Response, next: NextFunction) {}
}

export default new DeveloperController();
