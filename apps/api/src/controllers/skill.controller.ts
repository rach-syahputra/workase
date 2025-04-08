import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '@/helpers/api-response';
import SkillService from '@/services/skill.service';

class SkillController {
  private skillService: SkillService;

  constructor() {
    this.skillService = new SkillService();
  }

  getSkills = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.skillService.getSkills({
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        title: req.query.title as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Skills retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default SkillController;
