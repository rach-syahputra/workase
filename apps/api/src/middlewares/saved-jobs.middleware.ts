import { UserRequest } from '@/interfaces/middleware.interface';
import { savedJobsFilterSchema } from '@/validations/saved-jobs.validation';
import { NextFunction, Response } from 'express';

const validateSavedJobsFilter = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = await savedJobsFilterSchema();
    await schema.validate(req.query, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

export default validateSavedJobsFilter;
