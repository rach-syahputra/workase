import {
  AddCompanyReviewRequest,
  GetCompanyReviewsRequest,
  VerifyUserEmploymentRequest,
} from '@/interfaces/company-review.interface';
import { prisma } from '@/helpers/prisma';
import { calculateOverallRating } from '@/helpers/utils';

class CompanyReviewRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  addCompanyReview = async (req: AddCompanyReviewRequest) => {
    return await this.prisma.$transaction(async (trx) => {
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
    const user = await this.prisma.user.findUnique({
      select: {
        jobId: true,
      },
      where: {
        id: req.userId,
      },
    });

    if (user?.jobId) {
      const job = await this.prisma.job.findUnique({
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

  getCompanyReviews = async (req: GetCompanyReviewsRequest) => {
    const limit = req.limit || 12;
    const skip = req.cursor ? 1 : 0;
    const orderConfig = {
      createdAt: req.order || 'asc',
    };
    const cursorConfig = req.cursor ? { id: req.cursor } : undefined;

    const [totalCompanyReviews, companyReviews] =
      await this.prisma.$transaction([
        this.prisma.companyReview.count({
          where: {
            companyId: req.companyId,
          },
        }),
        this.prisma.companyReview.findMany({
          include: {
            CompanyReviewRatings: true,
          },
          where: {
            companyId: req.companyId,
          },
          orderBy: orderConfig,
          cursor: cursorConfig,
          take: limit,
          skip,
        }),
      ]);

    return {
      companyReviews,
      pagination: {
        totalCompanyReviews,
        cursor: companyReviews[companyReviews.length - 1].id || null,
      },
    };
  };
}

export default CompanyReviewRepository;
