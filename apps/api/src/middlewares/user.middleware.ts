import { userLoginSchema } from '@/validations/user-login.validation';
import userRegistrationSchema from '@/validations/user-registration.validation';
import { Request, Response, NextFunction } from 'express';

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

export { validateUserRegistration, validateUserLogin };
