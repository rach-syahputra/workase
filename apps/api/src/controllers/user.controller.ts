import { NextFunction, Response } from 'express';
import { Request } from 'express';
import { sendEmailVerification } from '@/helpers/email-verification';
import usersService from '@/services/user.service';
import { ApiResponse } from '@/helpers/api-response';
import { UserRequest } from '@/interfaces/middleware.interface';
import { hbs } from '@/helpers/handlebars';
import { putUserAccessToken } from '@/helpers/jwt';
import { transporter } from '@/helpers/nodemailer';
class UsersController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.register(req.body);
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
      const result = await usersService.login(req.body);
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
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.header('Authorization') as string;
      await sendEmailVerification(
        req.user?.email as string,
        accessToken,
        'users',
      );
      ApiResponse({
        res,
        statusCode: 200,
        message:
          'Link email verification has been send successfully to your email',
        data: undefined,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifiedEmail(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await usersService.verifiedEmail(req);
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

  async resetPassword(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await usersService.resetPassword(req);
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
      const { accessToken } = await putUserAccessToken(
        undefined,
        req.body.email,
      );
      const html = compilePasswordResetRequest({
        email: req.body.email,
        token: accessToken,
        role: 'users',
      });
      transporter.sendMail({
        to: req.body.email,
        subject: 'Reset Passwors',
        html,
      });
      ApiResponse({
        res,
        statusCode: 200,
        message:
          'Link reset passsword has been send successfully to your email',
        data: undefined,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserProfile(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await usersService.getUserProfile(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'get user profile success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserProfile(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await usersService.updateUserProfile(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'update user profile success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async addImageCloudinary(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await usersService.updateUserPhoto(req);
      ApiResponse({
        res,
        statusCode: 200,
        message: 'update user profile photo image success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const data = await usersService.refreshToken(req);
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
}

export default new UsersController();
