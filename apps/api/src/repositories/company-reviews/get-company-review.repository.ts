import {
  GetCompaniesReviewsRequest,
  GetCompanyReviewsRequest,
} from '../../interfaces/company-review.interface';
import { prisma } from '../../helpers/prisma';

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
            company: {
              slug: req.slug,
            },
          },
        }),
        this.prisma.companyReview.findMany({
          include: {
            CompanyReviewRatings: true,
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
              },
            },
            _count: {
              select: {
                SavedReview: true,
              },
            },
            ...(req.userId && {
              SavedReview: {
                where: {
                  userId: req.userId,
                },
              },
            }),
          },
          where: {
            company: {
              slug: req.slug,
            },
          },
          orderBy: orderConfig,
          cursor: cursorConfig,
          take: limit,
          skip,
        }),
      ]);

    return {
      reviews: companyReviews.map((review) => ({
        id: review.id,
        title: review.title,
        jobTitle: review.jobTitle,
        companyId: review.company.id,
        companyName: review.company.name,
        companyLogoUrl: review.company.logoUrl,
        salaryEstimate: review.salaryEstimate,
        content: review.content,
        createdAt: review.createdAt,
        isDeleted: review.isDeleted,
        rating: review.CompanyReviewRatings,
        savedCount: review._count.SavedReview,
        saved: !!(review.SavedReview && review.SavedReview.length > 0),
      })),
      pagination: {
        totalData: totalCompanyReviews,
        cursor:
          companyReviews.length > 0
            ? companyReviews[companyReviews.length - 1].id
            : null,
      },
    };
  };

  getCompaniesReviews = async (req: GetCompaniesReviewsRequest) => {
    const limit = req.limit || 12;
    const skip = req.cursor ? 1 : 0;
    const orderConfig = {
      createdAt: req.order || 'asc',
    };
    const cursorConfig = req.cursor ? { id: req.cursor } : undefined;

    const [totalCompaniesReviews, companiesReviews] =
      await this.prisma.$transaction([
        this.prisma.companyReview.count({
          where: {
            OR: [
              {
                jobTitle: {
                  contains: req.q,
                  mode: 'insensitive',
                },
              },
              {
                company: {
                  name: {
                    contains: req.q,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          },
        }),
        this.prisma.companyReview.findMany({
          include: {
            CompanyReviewRatings: true,
            company: true,
            _count: {
              select: {
                SavedReview: true,
              },
            },
            ...(req.userId && {
              SavedReview: {
                where: {
                  userId: req.userId,
                },
              },
            }),
          },
          where: {
            OR: [
              {
                jobTitle: {
                  contains: req.q,
                  mode: 'insensitive',
                },
              },
              {
                company: {
                  name: {
                    contains: req.q,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          },
          orderBy: orderConfig,
          cursor: cursorConfig,
          take: limit,
          skip,
        }),
      ]);

    return {
      reviews: companiesReviews.map((review) => ({
        id: review.id,
        title: review.title,
        jobTitle: review.jobTitle,
        companyId: review.company.id,
        companyName: review.company.name,
        companyLogoUrl: review.company.logoUrl,
        companySlug: review.company.slug,
        salaryEstimate: review.salaryEstimate,
        content: review.content,
        createdAt: review.createdAt,
        isDeleted: review.isDeleted,
        rating: review.CompanyReviewRatings,
        savedCount: review._count.SavedReview,
        saved: !!(review.SavedReview && review.SavedReview.length > 0),
      })),
      pagination: {
        totalData: totalCompaniesReviews,
        cursor:
          companiesReviews.length > 0
            ? companiesReviews[companiesReviews.length - 1].id
            : null,
      },
    };
  };
}

export default GetCompanyReviewRepository;
