import { NextFunction, Request, Response } from 'express';

import CvService from '../services/cv.service';
import { UserRequest } from '../interfaces/middleware.interface';
import { ApiResponse } from '../helpers/api-response';
import { ResponseError } from '../helpers/error';

class CvController {
  private cvService: CvService;

  constructor() {
    this.cvService = new CvService();
  }

  getCvBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.cvService.getCvBySlug({
        slug: req.params.slug,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'CV detail retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  addCv = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.cvService.addCv({
        userId: req.user.id,
        data: req.body.data,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'CV created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  updateCv = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated.');

      const data = await this.cvService.updateCv({
        userId: req.user.id,
        cvId: req.params.cvId,
        data: req.body.data,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'CV updated successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default CvController;
