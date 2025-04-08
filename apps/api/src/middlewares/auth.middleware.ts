import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from '@/config';
import { ResponseError } from '@/helpers/error';
import {
  DeveloperRequest,
  UserRequest,
  UserToken,
} from '@/interfaces/middleware.interface';

export function verifyUser(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    const token = String(authorization || '').split('Bearer ')[1];
    if (!token) throw new ResponseError(401, 'Unauthenticated.');

    const verifiedUser = jwt.verify(token, JWT_ACCESS_SECRET) as UserToken;
    if (!verifiedUser || verifiedUser.role !== 'USER')
      throw new ResponseError(403, 'Unauthorized.');

    req.user = verifiedUser;

    next();
  } catch (err) {
    next(err);
  }
}

export function verifyDeveloper(
  req: DeveloperRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    const token = String(authorization || '').split('Bearer ')[1];
    if (!token) throw new ResponseError(401, 'Unauthenticated.');

    const verifiedDeveloper = jwt.verify(token, JWT_ACCESS_SECRET) as UserToken;
    if (!verifiedDeveloper || verifiedDeveloper.role !== 'DEVELOPER')
      throw new ResponseError(403, 'Unauthorized.');

    req.developer = verifiedDeveloper;

    next();
  } catch (err) {
    next(err);
  }
}
