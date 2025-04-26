import { prisma } from '@/helpers/prisma';
import { GetUserStatsRequest } from '@/interfaces/user.interface';

class UserStatsRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getUserStats = async (req: GetUserStatsRequest) => {
    const userAssessment = await this.prisma.userAssessment.findMany({
      where: {
        userId: req.userId,
      },
    });

    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId: req.userId,
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
        assessment: {
          enrollmentCount: userAssessment.length,
        },
        subscription: {
          plan: subscription?.category || null,
          hasPendingTransaction: !!pendingTransaction,
        },
      },
    };
  };
}

export default UserStatsRepository;
