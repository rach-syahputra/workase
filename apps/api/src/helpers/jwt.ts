import jwt, { sign } from 'jsonwebtoken';

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '@/config';
import { CompanyToken, UserToken } from '@/interfaces/middleware.interface';
import { UserLogin } from '@/interfaces/user.interface';
import { getUserByEmail } from './user.prisma';
import { ResponseError } from './error';
import { getCompanyByEmail } from './company.prisma';
import { CompanyLogin } from '@/interfaces/company.interface';

export const putUserAccessToken = async (user?: UserLogin, email?: string) => {
  //kalo nda` lewat login bisa lewat yang lain, untuk generate token, dari email misalnya
  const userData = user || (await getUserByEmail(email!));
  if (userData) {
    delete userData.password;
  }
  const dataBundleUser = { ...userData, role: 'USER' } as UserToken;
  if (!dataBundleUser) throw new ResponseError(401, 'unauthorize email');
  console.log('ini yang direturn :', dataBundleUser);
  const accessToken = sign(dataBundleUser, JWT_ACCESS_SECRET, {
    expiresIn: '1h',
  });

  const refreshToken = sign(
    { email: dataBundleUser.email },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '3h',
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const putCompanyAccessToken = async (
  company?: CompanyLogin,
  email?: string,
) => {
  //kalo nda` lewat login bisa lewat yang lain, untuk generate token, dari email misalnya
  const companyData = company || (await getCompanyByEmail(email!));
  if (companyData) {
    delete companyData.password;
  }
  const dataBundleCompany = { ...companyData, role: 'ADMIN' } as CompanyToken;
  console.log('ini yang direturn :', dataBundleCompany);
  if (!dataBundleCompany) throw new ResponseError(401, 'unauthorize email');
  const accessToken = sign(dataBundleCompany, JWT_ACCESS_SECRET, {
    expiresIn: '1h',
  });
  const refreshToken = sign(
    { email: dataBundleCompany.email },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '3h',
    },
  );
  return {
    accessToken,
    refreshToken,
  };
};
