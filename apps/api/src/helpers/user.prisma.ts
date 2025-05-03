import prisma from '../prisma';
import { ResponseError } from './error';

export const getUserByEmail = async (email: string) => {
  if (!email) {
    throw new ResponseError(400, 'Email is required');
  }
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
