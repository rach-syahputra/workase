import { PrismaClient } from '@prisma/client';

import {
  AddSampleRequestRepository,
  GetSampleByEmailRequest,
} from '@/interfaces/sample/sample.interface';

class SampleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getSample = async () => {
    return this.prisma.developer.findMany();
  };

  getSampleByEmail = async ({ email }: GetSampleByEmailRequest) => {
    return this.prisma.developer.findUnique({
      where: {
        email,
      },
    });
  };

  addSample = async ({
    name,
    email,
    password,
    image,
  }: AddSampleRequestRepository) => {
    return this.prisma.developer.create({
      data: {
        email,
        name,
        password,
        image,
      },
    });
  };

  getUserByEmail = async (email: string) => {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  };
}

export default SampleRepository;
