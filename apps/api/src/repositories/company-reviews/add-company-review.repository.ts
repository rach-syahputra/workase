import {
  AddCompanyReviewRequest,
  VerifyUserEmploymentRequest,
} from '../../interfaces/company-review.interface';
import { prisma } from '../../helpers/prisma';
import { calculateRating } from '../../helpers/company-reviews/company-review.util';

class AddCompanyReviewRepository {
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

        const overallRating = calculateRating([
          req.rating.workCulture,
          req.rating.workLifeBalance,
          req.rating.facilities,
          req.rating.careerGrowth,
        ]);

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
}

export default AddCompanyReviewRepository;
