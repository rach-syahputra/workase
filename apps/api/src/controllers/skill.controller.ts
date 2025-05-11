import { NextFunction, Response } from 'express';

import SkillService from '../services/skill.service';
import { DeveloperRequest } from '../interfaces/middleware.interface';
import { OrderType } from '../interfaces/filter.interface';
import { ApiResponse } from '../helpers/api-response';
import { ResponseError } from '../helpers/error';

class SkillController {
  private skillService: SkillService;

  constructor() {
    this.skillService = new SkillService();
  }

  getSkills = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.skillService.getSkills({
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        order: req.query.order as OrderType,
        title: req.query.title as string,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Skills retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  addSkill = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.skillService.addSkill({
        title: req.body.title,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Skill created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  removeSkill = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.skillService.removeSkill({
        id: req.params.skillId,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Skill deleted successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default SkillController;
