import { sendEmailVerification } from '@/helpers/email-verification';
import prisma from '@/prisma';
import { AuthProvider } from '@prisma/client';
import { Request } from 'express';
import { putUserAccessToken } from '../../helpers/jwt';
import { ResponseError } from '@/helpers/error';
import { hashedPassword } from '@/helpers/bcrypt';
import { getUserByEmail } from '@/helpers/user.prisma';
class RegisterUsersRepository {
  async register(data: {
    email: string;
    password: string;
    authProvider: string;
  }) {
    const slug = data.email.split('@')[0];
    const userPassword = data.password
      ? await hashedPassword(data.password)
      : '';
    await prisma.user.create({
      data: {
        slug,
        email: data.email,
        password: userPassword,
        authProvider: data.authProvider as AuthProvider,
      },
    });
    if (data.authProvider === 'EMAIL') {
      const user = await getUserByEmail(data.email);
      if (!user) {
        throw new ResponseError(404, 'User not found');
      }
      const accessToken = await putUserAccessToken(undefined, data.email);
      console.log('ini yang dikirim :', accessToken.access_token);
      await sendEmailVerification(data.email, accessToken.access_token);
    }
  }
}
export default new RegisterUsersRepository();
