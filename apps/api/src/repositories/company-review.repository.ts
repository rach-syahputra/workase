import { PrismaClient } from '@prisma/client';

import {
  AddCompanyReviewRequest,
  VerifyUserEmploymentRequest,
} from '@/interfaces/company-review.interface';
import { prisma } from '@/helpers/prisma';
import { calculateOverallRating } from '@/helpers/utils';

class CompanyReviewRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  addCompanyReview = async (req: AddCompanyReviewRequest) => {
    return await prisma.$transaction(async (trx) => {
      const user = await trx.user.findUnique({
        select: {
          job: {
            select: {
              title: true,
            },
          },
        },
        where: {
          id: req.userId,
        },
      });

      if (user?.job?.title) {
        const companyReview = await trx.companyReview.create({
          data: {
            companyId: req.companyId,
            title: req.title,
            jobTitle: user.job?.title,
            salaryEstimate: req.salaryEstimate,
            content: req.content,
            createdAt: new Date(),
          },
        });

        const overallRating = calculateOverallRating(req.rating);

        const companyReviewRating = await trx.companyReviewRatings.create({
          data: {
            workCulture: req.rating.workCulture,
            workLifeBalance: req.rating.workLifeBalance,
            facilities: req.rating.facilities,
            careerGrowth: req.rating.careerGrowth,
            overallRating,
            companyReviewId: companyReview.id,
          },
        });

        return {
          companyReview: {
            ...companyReview,
            rating: {
              ...companyReviewRating,
            },
          },
        };
      }
    });
  };

  verifyUserEmployment = async (req: VerifyUserEmploymentRequest) => {
    const user = await prisma.user.findUnique({
      select: {
        jobId: true,
      },
      where: {
        id: req.userId,
      },
    });

    if (user?.jobId) {
      const job = await prisma.job.findUnique({
        select: {
          companyId: true,
        },
        where: {
          id: user?.jobId,
        },
      });

      return job?.companyId === req.companyId ? true : false;
    } else {
      return false;
    }
  };
}

export default CompanyReviewRepository;
