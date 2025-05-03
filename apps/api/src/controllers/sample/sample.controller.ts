import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '../../helpers/api-response';
import SampleService from '../../services/sample.service';

class SampleController {
  private sampleService: SampleService;

  constructor() {
    this.sampleService = new SampleService();
  }

  getSample = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.sampleService.getSample();

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Sample data retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getSampleByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.sampleService.getSampleByEmail({
        email: req.params.email,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Sample data by id retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  addSample = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.sampleService.addSample({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        image: req.file,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Sample data added successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.sampleService.login({
        email: req.body.email,
        password: req.body.password,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'User logged in successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default SampleController;
