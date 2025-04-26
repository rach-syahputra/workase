import { prisma } from '@/helpers/prisma';
import {
  AddSubscriptionRequest,
  GetSubscriptionByIdRequest,
  GetSubscriptionsRequest,
  GetSubscriptionTransactionStatusRequest,
} from '@/interfaces/subscription.interface';

class SubscriptionRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getSubscriptionById = async (req: GetSubscriptionByIdRequest) => {
    const subscription = await this.prisma.subscription.findUnique({
      where: {
        id: req.subscriptionId,
      },
    });

    return {
      subscription,
    };
  };

  addSupscription = async (req: AddSubscriptionRequest) => {
    const subscription = await this.prisma.subscription.create({
      data: {
        userId: req.userId,
        category: req.category,
        startedAt: new Date(),
      },
    });

    const subscriptionPayment = await this.prisma.subscriptionPayment.create({
      data: {
        totalPrice: req.totalPrice,
        paymentStatus: req.paymentStatus,
        slug: new Date(Date.now()).getTime().toString(),
        subscriptionId: subscription.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      subscription: {
        ...subscription,
        payment: subscriptionPayment,
      },
    };
  };

  getSubscriptions = async (req: GetSubscriptionsRequest) => {
    const limit = req.limit ? req.limit : 8;
    const page = req.page ? req.page : 1;
    const skipConfig = (page - 1) * limit;
    const orderConfig = {
      startedAt: req.order ? req.order : 'asc',
    };

    const [totalSubscriptions, subscriptions] = await this.prisma.$transaction([
      this.prisma.subscription.count({
        where: {
          ...(req.userId && { userId: req.userId }),
          SubscriptionPayment: {
            some: {
              paymentStatus: {
                in: req.paymentStatuses,
              },
            },
          },
        },
      }),
      this.prisma.subscription.findMany({
        where: {
          ...(req.userId && { userId: req.userId }),
          SubscriptionPayment: {
            some: {
              paymentStatus: {
                in: req.paymentStatuses,
              },
            },
          },
        },
        include: {
          SubscriptionPayment: {
            take: 1,
          },
          user: {
            select: {
              email: true,
            },
          },
        },
        orderBy: orderConfig,
        take: limit,
        skip: skipConfig,
      }),
    ]);

    return {
      subscriptions: subscriptions.map((subscription) => ({
        id: subscription.id,
        userId: subscription.userId,
        category: subscription.category,
        startedAt: subscription.startedAt,
        expiresAt: subscription.expiresAt,
        isDeleted: subscription.isDeleted,
        payment: subscription.SubscriptionPayment[0],
        user: subscription.user,
      })),
      pagination: {
        totalData: totalSubscriptions,
        totalPages: Math.ceil(totalSubscriptions / limit),
        page,
      },
    };
  };

  getSubcsriptionTransactionStatus = async (
    req: GetSubscriptionTransactionStatusRequest,
  ) => {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId: req.userId,
        SubscriptionPayment: {
          some: {
            paymentStatus: 'PENDING',
          },
        },
      },
      include: {
        SubscriptionPayment: true,
      },
    });

    const transaction = subscription?.SubscriptionPayment[0];
    const pendingTransaction =
      transaction?.paymentStatus === 'PENDING' ? transaction : null;

    return {
      subscription: {
        pendingTransaction,
      },
    };
  };
}

export default SubscriptionRepository;
