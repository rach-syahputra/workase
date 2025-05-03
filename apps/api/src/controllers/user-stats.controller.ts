import { NextFunction, Request, Response } from 'express';

import { UserRequest } from '@/interfaces/middleware.interface';
import UserStatsService from '@/services/user-stats.service';
import { ApiResponse } from '@/helpers/api-response';
import { ResponseError } from '@/helpers/error';

class UserStatsController {
  private userStatsService: UserStatsService;

  constructor() {
    this.userStatsService = new UserStatsService();
  }

  getUserStats = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.userStatsService.getUserStats({
        userId: req.user.id,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'User stats retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getUserDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userStatsService.getUserDetail({
        userSlug: req.params.slug,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'User detail retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new UserStatsController();
