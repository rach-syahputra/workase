import { OPENCAGE_API_KEY } from '@/config';
import jobFilterSchema from '@/validations/job.validation';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
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
      console.log('ini location di api', location);
      console.log(
        'ini poencage api key %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
        OPENCAGE_API_KEY,
      );
      const [lat, lng] = location.split(',');
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      if (isNaN(latitude) || isNaN(longitude)) {
        return res
          .status(400)
          .json({ message: 'Invalid coordinat location format' });
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

        if (!city)
          return res.status(400).json({ message: 'there is no location' });
        req.query.location = city;
        console.log(
          'ini city kamu $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
          city,
        );
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
