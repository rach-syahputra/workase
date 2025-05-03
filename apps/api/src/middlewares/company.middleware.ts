import { Request, Response, NextFunction } from 'express';

import companyRegistrationSchema from '../validations/company-registration.validation';
import companyLoginSchema from '../validations/company-login.validation';
import companySendResetPasswordSchema from '../validations/company-send-reset-password.validation';
import userAndCompanyResetPasswordSchema from '../validations/user-and-company-reset-password.validation';
import companyProfileUpdateSchema from '../validations/company-profile-update.validation';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';
import { CompanyRequest } from '../interfaces/middleware.interface';
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

const markPasswordResetAsIncomplete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: Prisma.CompanyUpdateInput = {};
    data.isPasswordReset = false;
    await prisma.company.update({
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
  req: CompanyRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const data: Prisma.CompanyUpdateInput = {};
    data.isPasswordReset = true;
    await prisma.company.update({
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
  req: CompanyRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const data = await prisma.company.findUnique({
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
  validateCompanyRegistration,
  validateCompanyLogin,
  validateEmailCompany,
  validateNewCompanyPassword,
  validateCompanyProfileUpdate,
  markPasswordResetAsIncomplete,
  markPasswordResetTokenAsUsed,
  verifyPasswordResetStatus,
};
