import {
  AddSavedReviewRequest,
  GetSavedReviewsRequest,
  RemoveSavedReviewRequest,
} from '../../interfaces/company-review.interface';
import { prisma } from '../../helpers/prisma';

class SavedReviewRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  addSavedReview = async (req: AddSavedReviewRequest) => {
    const savedReview = await this.prisma.savedReview.create({
      data: {
        companyReviewId: req.companyReviewId,
        userId: req.userId,
        createdAt: new Date(),
      },
    });

    return {
      savedReview,
    };
  };

  removeSavedReview = async (req: RemoveSavedReviewRequest) => {
    await this.prisma.savedReview.delete({
      where: {
        userId_companyReviewId: {
          companyReviewId: req.companyReviewId,
          userId: req.userId,
        },
      },
    });
  };

  getSavedReviews = async (req: GetSavedReviewsRequest) => {
    const limit = req.limit || 12;
    const page = req.page ? req.page : 1;
    const skipConfig = (page - 1) * limit;
    const orderConfig = {
      createdAt: req.order || 'asc',
    };

    const [totalSavedReviews, savedReviews] = await this.prisma.$transaction([
      this.prisma.savedReview.count({
        where: {
          userId: req.userId,
          companyReview: {
            content: {
              contains: req.q,
              mode: 'insensitive',
            },
          },
        },
      }),
      this.prisma.savedReview.findMany({
        where: {
          userId: req.userId,
          companyReview: {
            content: {
              contains: req.q,
              mode: 'insensitive',
            },
          },
        },
        include: {
          companyReview: {
            include: {
              company: true,
              CompanyReviewRatings: true,
              _count: {
                select: {
                  SavedReview: true,
                },
              },
            },
          },
        },
        orderBy: orderConfig,
        take: limit,
        skip: skipConfig,
      }),
    ]);

    return {
      savedReviews: savedReviews.map((savedReview) => ({
        userId: savedReview.userId,
        companyReview: {
          ...savedReview.companyReview,
          companyId: savedReview.companyReview.companyId,
          companyName: savedReview.companyReview.company.name,
          companyLogoUrl: savedReview.companyReview.company.logoUrl,
          companySlug: savedReview.companyReview.company.slug,
          rating: savedReview.companyReview.CompanyReviewRatings,
          savedCount: savedReview.companyReview._count.SavedReview,
          saved: !!savedReview.companyReview,
        },
      })),
      pagination: {
        totalData: totalSavedReviews,
        totalPages: Math.ceil(totalSavedReviews / limit),
        page,
      },
    };
  };
}

export default SavedReviewRepository;
