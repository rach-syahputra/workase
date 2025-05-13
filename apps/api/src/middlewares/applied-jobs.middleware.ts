import cloudinary from '../helpers/cloudinary';
import { ResponseError } from '../helpers/error';
import { UserRequest } from '../interfaces/middleware.interface';
import applicationsFilterSchema from '../validations/applications.validation';
import applyJobSchema from '../validations/apply-job.validation';
import { NextFunction, Response } from 'express';

const validateApplyJobInput = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = await applyJobSchema();
    const input = {
      jobId: req.params.jobId,
      userApplication: {},
      userId: req.user?.id,
      cv: req.file,
      ...req.body,
    };
    await schema.validate(input, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};
const validateApplicationsFilter = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schema = await applicationsFilterSchema();
    await schema.validate(req.query, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};

const uploadToCloudinary = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filePath = req.file?.path;
    if (!filePath || typeof filePath !== 'string') {
      throw new ResponseError(400, 'Invalid file provided for upload');
    }
    let result;
    try {
      result = await cloudinary.uploader.upload(filePath, {
        folder: 'user-upload-cv',
      });
    } catch (error) {
      throw new ResponseError(500, 'failed to upload image to Cloudinary');
    }
    req.body.cvUrl = result.secure_url;
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validateApplyJobInput,
  validateApplicationsFilter,
  uploadToCloudinary,
};
