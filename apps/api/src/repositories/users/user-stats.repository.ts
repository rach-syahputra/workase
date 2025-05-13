import { prisma } from '../../helpers/prisma';
import {
  GetCurrentCompanyRequest,
  GetUserDetailRequest,
  GetUserMetadataRequest,
  GetUserStatsRequest,
} from '../../interfaces/user.interface';
import { ICvData } from '../../interfaces/cv.interface';

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
        AppliedJob: {
          where: {
            status: 'ACCEPTED',
          },
          select: {
            job: {
              select: {
                title: true,
                company: true,
              },
            },
          },
          take: 1,
        },
      },
    });

    const { Cv, UserAssessment, AppliedJob, ...rest } = user!;

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
        company: AppliedJob[0]?.job
          ? {
              id: AppliedJob[0]?.job?.company.id,
              name: AppliedJob[0]?.job?.company.name,
              email: AppliedJob[0]?.job?.company.email,
              phoneNumber: AppliedJob[0]?.job?.company.phoneNumber,
              logoUrl: AppliedJob[0]?.job?.company.logoUrl,
              description: AppliedJob[0]?.job?.company.description,
              category: AppliedJob[0]?.job?.company.category,
              location: AppliedJob[0]?.job?.company.location,
              slug: AppliedJob[0]?.job?.company.slug,
              role: AppliedJob[0]?.job?.title,
            }
          : null,
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

  getUserMetadata = async (req: GetUserMetadataRequest) => {
    const user = await this.prisma.user.findUnique({
      where: {
        slug: req.slug,
      },
      include: {
        Cv: {
          select: {
            data: true,
          },
          take: 1,
        },
      },
    });

    const cv = user?.Cv[0].data as ICvData;

    return {
      user: {
        profilePhoto: user?.profilePhoto || null,
        summary: cv.summary?.content || null,
      },
    };
  };
}

export default UserStatsRepository;
