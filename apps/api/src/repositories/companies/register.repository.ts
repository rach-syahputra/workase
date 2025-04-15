import { hashedPassword } from '@/helpers/bcrypt';
import { getCompanyByEmail } from '@/helpers/company.prisma';
import { sendEmailVerification } from '@/helpers/email-verification';
import { ResponseError } from '@/helpers/error';
import { putCompanyAccessToken, putUserAccessToken } from '@/helpers/jwt';
import prisma from '@/prisma';
import { AuthProvider } from '@prisma/client';
import { Request } from 'express';
class RegisterCompanyRepository {
  async register(data: {
    name: string;
    email: string;
    password: string;
    telp: string;
    authProvider: string;
  }) {
    const slug = data.email.split('@')[0];
    const userPassword = data.password
      ? await hashedPassword(data.password)
      : '';
    await prisma.company.create({
      data: {
        slug,
        name: data.name,
        email: data.email,
        password: userPassword,
        phoneNumber: data.telp,
        authProvider: data.authProvider as AuthProvider,
      },
    });
    if (data.authProvider === 'EMAIL') {
      const user = await getCompanyByEmail(data.email);
      if (!user) {
        throw new ResponseError(404, 'User not found');
      }
      const accessToken = await putCompanyAccessToken(undefined, data.email);
      await sendEmailVerification(data.email, accessToken.access_token);
    }
  }
}
export default new RegisterCompanyRepository();
