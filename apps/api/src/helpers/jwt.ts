import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from '@/config';
import { DeveloperToken, UserToken } from '@/interfaces/middleware.interface';
import { UserAssessmentToken } from '@/interfaces/user-assessment.interface';

export const putAccessToken = async (data: UserToken) => {
  return jwt.sign(data, JWT_ACCESS_SECRET, {
    expiresIn: '1d',
  });
};

export const generateDeveloperAccessToken = async (data: DeveloperToken) => {
  return jwt.sign(data, JWT_ACCESS_SECRET, {
    expiresIn: '1d',
  });
};

export const generateUserAssessmentAccessToken = async (
  data: UserAssessmentToken,
) => {
  return jwt.sign(data, JWT_ACCESS_SECRET, {
    expiresIn: '1h',
  });
};
