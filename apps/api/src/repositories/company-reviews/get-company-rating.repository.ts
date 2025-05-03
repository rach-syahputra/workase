import { prisma } from '../../helpers/prisma';
import {
  calculateRating,
  calculateRatingPercentages,
} from '../../helpers/company-reviews/company-review.util';
import { GetCompanyRatingRequest } from '../../interfaces/company-review.interface';

class GetCompanyRatingRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getCompanyRating = async (req: GetCompanyRatingRequest) => {
    const [company, totalReviews, ratings] = await this.prisma.$transaction([
      this.prisma.company.findUnique({
        where: {
          id: req.companyId,
        },
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      }),
      this.prisma.companyReview.count({
        where: {
          companyId: req.companyId,
        },
      }),
      this.prisma.companyReviewRatings.findMany({
        where: {
          companyReview: {
            companyId: req.companyId,
          },
        },
      }),
    ]);

    return {
      rating: {
        overall: calculateRating(ratings.map((rating) => rating.overallRating)),
        workCulture: calculateRating(
          ratings.map((rating) => rating.workCulture),
        ),
        workLifeBalance: calculateRating(
          ratings.map((rating) => rating.workLifeBalance),
        ),
        facilities: calculateRating(ratings.map((rating) => rating.facilities)),
        careerGrowth: calculateRating(
          ratings.map((rating) => rating.careerGrowth),
        ),

        percentage: calculateRatingPercentages(
          ratings.map((rating) => ({
            overallRating: rating.overallRating,
            workCulture: rating.workCulture,
            workLifeBalance: rating.workLifeBalance,
            facilities: rating.facilities,
            careerGrowth: rating.careerGrowth,
          })),
        ),
      },
      totalReviews,
    };
  };
}

export default GetCompanyRatingRepository;
