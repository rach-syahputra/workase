import { PrismaClient } from '@prisma/client';

import {
  AddSampleRequestRepository,
  GetSampleByEmailRequest,
} from '../../interfaces/sample/sample.interface';
import { generateRandomString, generateSlug } from '../../helpers/utils';

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

  addSample = async (req: AddSampleRequestRepository) => {
    // Generate slug based on user name
    let slug = generateSlug(req.name);

    // Find existing data by generated slug
    const sample = await this.prisma.developer.findFirst({
      where: {
        slug,
      },
    });

    // If the generated slug already exists in the database,
    // Add additional unique characters to the generated slug to ensure uniqueness
    if (sample?.slug === slug) {
      const randomString = generateRandomString(4);
      slug += `-${randomString}`;
    }

    return this.prisma.developer.create({
      data: {
        ...req,
        slug,
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
