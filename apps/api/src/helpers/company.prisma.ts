import prisma from '../prisma';
import { ResponseError } from './error';

export const getCompanyByEmail = async (email: string) => {
  if (!email) {
    throw new ResponseError(400, 'Email is required');
  }
  return prisma.company.findUnique({
    where: {
      email,
    },
  });
};
