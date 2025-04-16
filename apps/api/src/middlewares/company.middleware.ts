import { Request, Response, NextFunction } from 'express';

import companyRegistrationSchema from '@/validations/company-registration.validation';
import companyLoginSchema from '@/validations/company-login.validation';
import companySendResetPasswordSchema from '@/validations/company-send-reset-password.validation';
import userAndCompanyResetPasswordSchema from '@/validations/user-and-company-reset-password.validation';
import companyProfileUpdateSchema from '@/validations/company-profile-update.validation';
const validateCompanyRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = companyRegistrationSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateCompanyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = companyLoginSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateEmailCompany = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = companySendResetPasswordSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};
const validateNewCompanyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = userAndCompanyResetPasswordSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const validateCompanyProfileUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = companyProfileUpdateSchema();
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateCompanyRegistration,
  validateCompanyLogin,
  validateEmailCompany,
  validateNewCompanyPassword,
  validateCompanyProfileUpdate,
};
