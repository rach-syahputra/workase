import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { CompanyReviewRating } from '@/interfaces/company-review.interface';

export const generateUUID = () => {
  return uuidv4();
};

export const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const convertDateToUTC7 = (date: Date): string => {
  const utc7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return utc7Date.toISOString();
};

export const calculateOverallRating = ({
  workCulture,
  workLifeBalance,
  facilities,
  careerGrowth,
}: CompanyReviewRating) => {
  const overallRating =
    (workCulture + workLifeBalance + facilities + careerGrowth) / 4;

  return overallRating > 5 ? 5 : overallRating;
};
