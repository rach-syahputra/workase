import { prisma } from '../../helpers/prisma';
import {
  CheckPaymentExpirationsRequest,
  GetSubscriptionPaymentBySlugRequest,
  UpdateSubscriptionPaymentRepositoryRequest,
} from '../../interfaces/subscription.interface';

class SubscriptionPaymentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

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

        const latestSubscription = await trx.subscription.findFirst({
          where: {
            expiresAt: {
              gt: new Date(),
            },
          },
          orderBy: {
            expiresAt: 'desc',
          },
        });

        // If the user has an active or extended subscription, extend 30 days from the latest subscription expiration date.
        // Otherwise, set the expiration 30 days from now (new subscription).
        await trx.subscription.update({
          where: {
            id: subscriptionPayment.subscriptionId,
          },
          data: {
            ...(latestSubscription?.expiresAt && {
              startedAt: latestSubscription.expiresAt,
            }),
            expiresAt: latestSubscription?.expiresAt
              ? new Date(
                  new Date(latestSubscription.expiresAt).getTime() +
                    THIRTY_DAYS_LATER,
                )
              : new Date(Date.now() + THIRTY_DAYS_LATER),
          },
        });
      }

      return {
        subscriptionPayment,
      };
    });
  };

  getSubscriptionPaymentBySlug = async (
    req: GetSubscriptionPaymentBySlugRequest,
  ) => {
    const subscriptionPayment =
      await this.prisma.subscriptionPayment.findUnique({
        where: {
          slug: req.slug,
        },
        include: {
          subscription: {
            select: {
              category: true,
            },
          },
        },
      });

    return {
      subscriptionPayment: {
        ...subscriptionPayment,
        category: subscriptionPayment?.subscription.category,
      },
    };
  };

  checkPaymentExpirations = async (req?: CheckPaymentExpirationsRequest) => {
    const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    // Get expired unsubmitted subscription payments
    const expiredPayments = await this.prisma.subscriptionPayment.findMany({
      where: {
        ...(req?.userId && {
          subscription: {
            userId: req.userId,
          },
        }),
        paymentStatus: 'PENDING',
        paymentProof: null,
        createdAt: {
          lt: oneDayAgo,
        },
      },
    });

    // Update expired payment statuses to REJECTED
    const updatedExpiredPayments = expiredPayments.map((payment) =>
      this.prisma.subscriptionPayment.update({
        where: {
          id: payment.id,
        },
        data: {
          paymentStatus: 'REJECTED',
        },
      }),
    );

    await Promise.all(updatedExpiredPayments);
  };
}

export default SubscriptionPaymentRepository;
