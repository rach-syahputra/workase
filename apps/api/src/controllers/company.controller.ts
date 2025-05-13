import { NextFunction, Response } from 'express';
import { Request } from 'express';
import companiesService from '../services/company.service';
import { ApiResponse } from '../helpers/api-response';
import { CompanyRequest } from '../interfaces/middleware.interface';
import { sendEmailVerification } from '../helpers/email-verification';
import companyService from '../services/company.service';
import { hbs } from '../helpers/handlebars';
import { putCompanyAccessToken } from '../helpers/jwt';
import { transporter } from '../helpers/nodemailer';
export default new (class CompaniesController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.register(req.body);
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
      const result = await companiesService.login(req.body);
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
  async sendEmailVerification(
    req: CompanyRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.header('Authorization') as string;
      await sendEmailVerification(
        req.user?.email as string,
        accessToken,
        'companies',
      );
      ApiResponse({
        res,
        statusCode: 200,
        message: 'Link has been send successfully to your email',
        data: undefined,
      });
    } catch (error) {
      next(error);
    }
  }
  async verifiedEmail(req: CompanyRequest, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.verifiedEmail(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'verification succes',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req: CompanyRequest, res: Response, next: NextFunction) {
    try {
      const result = await companyService.resetPassword(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'Password has been updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async passwordResetRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const compilePasswordResetRequest = await hbs('reset-password-template');
      const { accessToken } = await putCompanyAccessToken(
        undefined,
        req.body.email,
      );
      const html = compilePasswordResetRequest({
        email: req.body.email,
        token: accessToken,
        role: 'companies',
      });
      transporter.sendMail({
        to: req.body.email,
        subject: 'Reset Passwors',
        html,
      });
      ApiResponse({
        res,
        statusCode: 200,
        message: 'Link has been send successfully to your email',
        data: undefined,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCompanyProfile(
    req: CompanyRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await companiesService.updateCompanyProfile(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'update company profile success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  // Pass any errors to the next middleware
  async addImageCloudinary(
    req: CompanyRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await companiesService.updateCompanyLogo(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'update company logo image success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req: CompanyRequest, res: Response, next: NextFunction) {
    try {
      const data = await companiesService.refreshToken(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'new access token has been created',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCompanyJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.getCompanyJobs(req as any);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'get company jobs success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.getCompanies(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'get companies success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCompanyBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companiesService.getCompanyBySlug(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'get company by slug success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
})();
