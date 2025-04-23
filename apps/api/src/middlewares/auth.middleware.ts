import { NextFunction, Response } from 'express';
import jwt, { verify } from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';

import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET as refresh_jwt_secret,
} from '@/config';
import { ResponseError } from '@/helpers/error';
import {
  CompanyRequest,
  CompanyToken,
  UserRequest,
  UserToken,
  DeveloperRequest,
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

    req.user = verifiedUser as UserToken;

    next();
  } catch (err) {
    next(err);
  }
}

export function verifyCompany(
  req: CompanyRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    const token = String(authorization || '').split('Bearer ')[1];
    if (!token) throw new ResponseError(401, 'Unauthenticated.');

    const verifiedCompany = jwt.verify(
      token,
      JWT_ACCESS_SECRET,
    ) as CompanyToken;
    if (!verifiedCompany || verifiedCompany.role !== 'ADMIN')
      throw new ResponseError(403, 'Unauthorized.');

    req.user = verifiedCompany as CompanyToken;

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

export const verifyRefreshToken = (
  req: UserRequest | CompanyRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    const token = String(authorization || '').split('Bearer ')[1];
    console.log('ini tokennya', token);
    const verifiedUser = verify(token, refresh_jwt_secret);
    if (!verifiedUser) {
      throw new ResponseError(401, 'Unauthorized');
    }
    console.log('ini verified user', verifiedUser);
    req.user = verifiedUser as UserToken | CompanyToken;
    console.log('ini req.user', req.user);
    next();
  } catch (error) {
    next(error);
  }
};
