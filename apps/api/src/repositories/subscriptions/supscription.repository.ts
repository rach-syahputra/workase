import { prisma } from '@/helpers/prisma';
import {
  AddSubscriptionRequest,
  GetSubscriptionByIdRequest,
  GetSubscriptionsRequest,
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
      createdAt: req.order ? req.order : 'asc',
    };

    const [totalSubscriptions, payments] = await this.prisma.$transaction([
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
      this.prisma.subscriptionPayment.findMany({
        where: {
          subscription: {
            ...(req.userId && { userId: req.userId }),
          },
          paymentStatus: {
            in: req.paymentStatuses,
          },
        },
        include: {
          subscription: {
            include: {
              user: true,
            },
          },
        },
        orderBy: orderConfig,
        take: limit,
        skip: skipConfig,
      }),
    ]);

    return {
      subscriptions: payments.map((payment) => ({
        id: payment.subscription.id,
        userId: payment.subscription.userId,
        category: payment.subscription.category,
        startedAt: payment.subscription.startedAt,
        expiresAt: payment.subscription.expiresAt,
        isDeleted: payment.subscription.isDeleted,
        payment: payment,
        user: payment.subscription.user,
      })),
      pagination: {
        totalData: totalSubscriptions,
        totalPages: Math.ceil(totalSubscriptions / limit),
        page,
      },
    };
  };
}

export default SubscriptionRepository;
