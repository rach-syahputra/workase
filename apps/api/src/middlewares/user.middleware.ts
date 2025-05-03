import { userLoginSchema } from '../validations/user-login.validation';
import userRegistrationSchema from '../validations/user-registration.validation';
import userResetPasswordSchema from '../validations/user-and-company-reset-password.validation';
import userSendResetPasswordSchema from '../validations/user-send-reset-password.validation';
import { Request, Response, NextFunction } from 'express';
import userProfileUpdateSchema from '../validations/user-profile-update.validation';
import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { UserRequest } from '../interfaces/middleware.interface';

const validateUserRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = userRegistrationSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = userLoginSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateNewUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = userResetPasswordSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateEmailUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = userSendResetPasswordSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateUserProfileUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = userProfileUpdateSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const markPasswordResetAsIncomplete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: Prisma.UserUpdateInput = {};
    data.isPasswordReset = false;
    await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const markPasswordResetTokenAsUsed = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const data: Prisma.UserUpdateInput = {};
    data.isPasswordReset = true;
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const verifyPasswordResetStatus = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        isPasswordReset: true,
      },
    });
    if (!data?.isPasswordReset) {
      next();
    } else {
      next(new Error('Password reset token has been used'));
    }
  } catch (error) {
    next(error);
  }
};

export {
  validateUserRegistration,
  validateUserLogin,
  validateNewUserPassword,
  validateEmailUser,
  validateUserProfileUpdate,
  markPasswordResetAsIncomplete,
  markPasswordResetTokenAsUsed,
  verifyPasswordResetStatus,
};
