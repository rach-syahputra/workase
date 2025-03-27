import jobFilterSchema from '@/validations/job.validation';
import { NextFunction, Request, Response } from 'express';

const validateJobFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = await jobFilterSchema();
    await schema.validate(req.query, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

export default validateJobFilter;
