import { Request, Response, NextFunction } from 'express';

import companyRegistrationSchema from '@/validations/company-registration.validation';
import companyLoginSchema from '@/validations/company-login.validation';
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

export { validateCompanyRegistration, validateCompanyLogin };
