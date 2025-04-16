import { userLoginSchema } from '@/validations/user-login.validation';
import userRegistrationSchema from '@/validations/user-registration.validation';
import userResetPasswordSchema from '@/validations/user-and-company-reset-password.validation';
import userSendResetPasswordSchema from '@/validations/user-send-reset-password.validation';
import { Request, Response, NextFunction } from 'express';
import userProfileUpdateSchema from '@/validations/user-profile-update.validation';

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

export {
  validateUserRegistration,
  validateUserLogin,
  validateNewUserPassword,
  validateEmailUser,
  validateUserProfileUpdate
};
