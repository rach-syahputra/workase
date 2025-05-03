import { hashedPassword } from '../../helpers/bcrypt';
import { getCompanyByEmail } from '../../helpers/company.prisma';
import { sendEmailVerification } from '../../helpers/email-verification';
import { ResponseError } from '../../helpers/error';
import { putCompanyAccessToken, putUserAccessToken } from '../../helpers/jwt';
import { generateHashedPassword } from '../../helpers/utils';
import prisma from '../../prisma';
import { AuthProvider } from '@prisma/client';
import { Request } from 'express';
class registerCompanyRepository {
  async register(data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    authProvider: string;
  }) {
    const slug = data.email.split('../..')[0];
    const userPassword = data.password
      ? await generateHashedPassword(data.password)
      : '';
    const userPhoneNumber = data.phoneNumber ? data.phoneNumber : '';
    const userName = data.name ? data.name : '';
    await prisma.company.create({
      data: {
        slug,
        name: userName,
        email: data.email,
        password: userPassword,
        phoneNumber: userPhoneNumber,
        authProvider: data.authProvider as AuthProvider,
        isVerified: false,
      },
    });
    if (data.authProvider === 'EMAIL') {
      const user = await getCompanyByEmail(data.email);
      if (!user) {
        throw new ResponseError(404, 'User not found');
      }
      const accessToken = await putCompanyAccessToken(undefined, data.email);
      await sendEmailVerification(
        data.email,
        accessToken.accessToken,
        'companies',
      );
    }
  }
}
export default new registerCompanyRepository();
