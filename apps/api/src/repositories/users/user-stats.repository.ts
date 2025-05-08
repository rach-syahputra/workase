import { prisma } from '../../helpers/prisma';
import {
  GetCurrentCompanyRequest,
  GetUserDetailRequest,
  GetUserStatsRequest,
} from '../../interfaces/user.interface';

class UserStatsRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getUserStats = async (req: GetUserStatsRequest) => {
    // Find active plan
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId: req.userId,
        startedAt: {
          lt: new Date(),
        },
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    const pendingTransaction = await this.prisma.subscriptionPayment.findFirst({
      where: {
        subscription: {
          userId: req.userId,
        },
        paymentStatus: 'PENDING',
      },
    });

    return {
      stats: {
        subscription: {
          id: subscription?.id,
          assessmentEnrollmentCount: subscription?.assessmentEnrollmentCount,
          plan: subscription?.category || null,
          hasPendingTransaction: !!pendingTransaction,
          expiresAt: subscription?.expiresAt,
        },
      },
    };
  };

  getUserDetail = async (req: GetUserDetailRequest) => {
    const user = await this.prisma.user.findUnique({
      where: {
        slug: req.userSlug,
      },
      include: {
        Cv: {
          take: 1,
        },
        UserAssessment: {
          where: {
            score: {
              gte: 85,
            },
          },
          select: {
            score: true,
            assessment: {
              select: {
                slug: true,
                skill: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
            Certificate: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    const { Cv, UserAssessment, ...rest } = user!;

    return {
      user: {
        ...rest,
        cv: Cv[0] || null,
        badges: user?.UserAssessment.map((userAssessment) => ({
          id: userAssessment.assessment.skill.id,
          slug: userAssessment.assessment.slug,
          title: userAssessment.assessment.skill.title,
          score: userAssessment.score,
          certificateSlug: userAssessment.Certificate?.slug,
        })),
      },
    };
  };

  getCurrentCompany = async (req: GetCurrentCompanyRequest) => {
    const appliedJobs = await this.prisma.appliedJob.findMany({
      where: {
        userId: req.userId,
      },
      select: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    return {
      currentCompanies: appliedJobs.map((appliedJob) => ({
        id: appliedJob.job.company.id,
        name: appliedJob.job.company.name,
        jobTitle: appliedJob.job.title,
        slug: appliedJob.job.company.slug,
      })),
    };
  };
}

export default UserStatsRepository;
