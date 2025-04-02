import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from '@/config';
import { UserToken } from '@/interfaces/middleware.interface';

export const putAccessToken = async (data: UserToken) => {
  return jwt.sign(data, JWT_ACCESS_SECRET, {
    expiresIn: '1d',
  });
};
