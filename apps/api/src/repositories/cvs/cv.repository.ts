import { Prisma } from '@prisma/client';

import {
  AddCvRequest,
  CheckCvOwnershipRequest,
  GetCvBySlugRequest,
  UpdateCvRequest,
} from '../../interfaces/cv.interface';
import { prisma } from '../../helpers/prisma';
import { generateCertificateSlug } from '../../helpers/utils';

class CvRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  checkCvOwnership = async (req: CheckCvOwnershipRequest) => {
    return await this.prisma.cv.findUnique({
      where: {
        id: req.cvId,
      },
    });
  };

  getCvBySlug = async (req: GetCvBySlugRequest) => {
    const cv = await this.prisma.cv.findUnique({
      where: {
        slug: req.slug,
      },
    });

    return {
      cv,
    };
  };

  addCv = async (req: AddCvRequest) => {
    const slug = generateCertificateSlug();

    const cv = await this.prisma.cv.create({
      data: {
        slug,
        data: req.data as unknown as Prisma.JsonArray,
        template: req.template,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: req.userId,
      },
    });

    return {
      cv,
    };
  };

  updateCv = async (req: UpdateCvRequest) => {
    const cv = await this.prisma.cv.update({
      where: {
        id: req.cvId,
      },
      data: {
        data: req.data as unknown as Prisma.JsonArray,
        updatedAt: new Date(),
        template: req.template,
      },
    });

    return {
      cv,
    };
  };
}

export default CvRepository;
