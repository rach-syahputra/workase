import jwt from 'jsonwebtoken';

import { UserToken } from '@/interfaces/users/user.interface';
import { JWT_ACCESS_SECRET } from '@/config';

export const putAccessToken = async (data: UserToken) => {
  return jwt.sign(data, JWT_ACCESS_SECRET, {
    expiresIn: '1d',
  });
};
