import { prisma } from '@/helpers/prisma';
import {
  AddSubscriptionPaymenRepositoryRequest,
  AddSubscriptionRequest,
  GetSubscriptionsRequest,
  UpdateSubscriptionPaymentRepositoryRequest,
} from '@/interfaces/subscription.interface';

class SubscriptionRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

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
        paymentStatus: req.paymentStatus,
        slug: new Date(Date.now()).getTime().toString(),
        subscriptionId: subscription.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      subscription,
    };
  };

  updateSubscriptionPayment = async (
    req: UpdateSubscriptionPaymentRepositoryRequest,
  ) => {
    return await this.prisma.$transaction(async (trx) => {
      const subscriptionPayment = await trx.subscriptionPayment.update({
        where: {
          id: req.subscriptionPaymentId,
        },
        data: {
          approvedBy: req.approvedBy,
          paymentProof: req.paymentProof,
          paymentStatus: req.paymentStatus,
          updatedAt: new Date(),
        },
      });

      // Set the subscription expiration date if the payment status is CONFIRMED
      if (req.paymentStatus === 'CONFIRMED') {
        const THIRTY_DAYS_LATER = 30 * 24 * 60 * 60 * 1000;

        await trx.subscription.update({
          where: {
            id: subscriptionPayment.subscriptionId,
          },
          data: {
            expiresAt: new Date(Date.now() + THIRTY_DAYS_LATER), // 30 days later
          },
        });
      }

      return {
        subscriptionPayment,
      };
    });
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
          userId: req.userId,
        },
      }),
      this.prisma.subscription.findMany({
        where: {
          userId: req.userId,
        },
        include: {
          SubscriptionPayment: {
            take: 1,
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
