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
    return await this.prisma.$transaction(async (trx) => {
      const company = await trx.company.findUnique({
        where: {
          slug: req.slug,
        },
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      });

      const totalReviews = await trx.companyReview.count({
        where: {
          companyId: company?.id,
        },
      });

      console.log('total reviews: ', totalReviews);

      const ratings = await trx.companyReviewRatings.findMany({
        where: {
          companyReview: {
            companyId: company?.id,
          },
        },
      });

      console.log('ratings: ', ratings);

      return {
        rating: {
          overall: calculateRating(
            ratings.map((rating) => rating.overallRating),
          ),
          workCulture: calculateRating(
            ratings.map((rating) => rating.workCulture),
          ),
          workLifeBalance: calculateRating(
            ratings.map((rating) => rating.workLifeBalance),
          ),
          facilities: calculateRating(
            ratings.map((rating) => rating.facilities),
          ),
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
    });
  };
}

export default GetCompanyRatingRepository;
