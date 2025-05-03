import { OPENCAGE_API_KEY } from '@/config';
import jobFilterSchema from '@/validations/job.validation';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { ResponseError } from '@/helpers/error';
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

const changeLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const location = req.query.location as string;
    if (/\d/.test(location)) {
      const [lat, lng] = location.split(',');
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      if (isNaN(latitude) || isNaN(longitude)) {
        return next(new ResponseError(400, 'Invalid location format'));
      }
      try {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${OPENCAGE_API_KEY}`;
        const response = await axios.get(url);
        const result = (response.data as { results: any[] }).results[0];
        const city =
          result.components.city ||
          result.components.town ||
          result.components.village ||
          result.components.country;

        if (!city) return next(new ResponseError(404, 'Location not found'));
        req.query.location = city;

        next();
      } catch (innerError) {
        next(innerError);
      }
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export { changeLocation };

export default validateJobFilter;
