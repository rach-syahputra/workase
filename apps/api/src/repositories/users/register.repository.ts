import { sendEmailVerification } from '@/helpers/email-verification';
import prisma from '@/prisma';
import { AuthProvider } from '@prisma/client';
import { Request } from 'express';
class RegisterUsersRepository {
  async register(data: {
    email: string;
    password: string;
    authProvider: string;
  }) {
    if (data.authProvider === 'EMAIL') {
      await sendEmailVerification(data.email);
    }
    await prisma.user.create({
      data: {
        slug: '',
        email: data.email,
        password: data.password,
        authProvider: data.authProvider as AuthProvider,
      },
    });
  }
}
export default new RegisterUsersRepository();
