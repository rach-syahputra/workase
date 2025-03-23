import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '@/helpers/api-response';
import SampleService from '@/services/sample/sample.service';

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
      const { email } = req.params;
      const data = await this.sampleService.getSampleByEmail({ email });

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
      const { email, name, password } = req.body;
      const data = await this.sampleService.addSample({
        email,
        name,
        password,
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
}

export default SampleController;
