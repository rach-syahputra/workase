import { NextFunction, Request, Response } from 'express';

import CertificateService from '../services/certificate.service';
import { ApiResponse } from '../helpers/api-response';
import { UserRequest } from '../interfaces/middleware.interface';
import { ResponseError } from '../helpers/error';

class CertificateController {
  private certificateService: CertificateService;

  constructor() {
    this.certificateService = new CertificateService();
  }

  generateCertificateToken = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.certificateService.generateCertificateToken({
        userAssessmentId: req.body.userAssessmentId,
        userName: req.body.userName,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Certificate QR code token generated successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  addCertificate = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.certificateService.addCertificate({
        userAssessmentId: req.body.userAssessmentId,
        slug: req.body.slug,
        pdf: req.file!,
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Certificate created successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCertificateDetail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.certificateService.getCertificateDetail({
        slug: req.params.slug,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Certificate detail retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCertificateMetadata = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.certificateService.getCertificateMetadata({
        slug: req.params.slug,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Certificate metadata retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default CertificateController;
