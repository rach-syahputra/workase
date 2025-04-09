import { calculateRating } from '@/helpers/company-reviews/company-review.util';
import { prisma } from '@/helpers/prisma';
import { searchCompanyReviewsRequest } from '@/interfaces/search-company-review.interface';

class SearchCompanyReviewRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  searchCompanyReviews = async (req: searchCompanyReviewsRequest) => {
    const companies = await this.prisma.company.findMany({
      where: {
        name: {
          contains: req.q,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        CompanyReview: {
          select: {
            id: true,
            CompanyReviewRatings: {
              select: {
                overallRating: true,
              },
            },
          },
        },
      },

      orderBy: {
        CompanyReview: {
          _count: 'desc',
        },
      },

      take: 5,
    });

    const sortedCompanies = companies
      .map((company) => ({
        id: company.id,
        name: company.name,
        logoUrl: company.logoUrl,
        overallRating: calculateRating(
          company.CompanyReview.map(
            (review) => review.CompanyReviewRatings?.overallRating || 0,
          ),
        ),
        totalReviews: company.CompanyReview.length,
      }))
      .sort((a, b) => b.totalReviews - a.totalReviews);

    return {
      companies: sortedCompanies,
    };
  };
}

export default SearchCompanyReviewRepository;
