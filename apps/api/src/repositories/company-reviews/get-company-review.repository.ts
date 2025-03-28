import {
  GetCompaniesReviewsRequest,
  GetCompanyReviewsRequest,
} from '@/interfaces/company-review.interface';
import { prisma } from '@/helpers/prisma';
import { IFilter } from '@/interfaces/filter.interface';

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
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
              },
            },
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
      })),
      pagination: {
        totalCompanyReviews,
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
            company: {
              name: {
                contains: req.q,
                mode: 'insensitive',
              },
            },
          },
        }),
        this.prisma.companyReview.findMany({
          include: {
            CompanyReviewRatings: true,
            company: true,
          },
          where: {
            company: {
              name: {
                contains: req.q,
                mode: 'insensitive',
              },
            },
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
        salaryEstimate: review.salaryEstimate,
        content: review.content,
        createdAt: review.createdAt,
        isDeleted: review.isDeleted,
        rating: review.CompanyReviewRatings,
      })),
      pagination: {
        totalCompaniesReviews,
        cursor:
          companiesReviews.length > 0
            ? companiesReviews[companiesReviews.length - 1].id
            : null,
      },
    };
  };
}

export default GetCompanyReviewRepository;
