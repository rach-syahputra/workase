import { GetCompanyReviewsRequest } from '@/interfaces/company-review.interface';
import { prisma } from '@/helpers/prisma';

class GetCompanyReviewRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

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

export default GetCompanyReviewRepository;
