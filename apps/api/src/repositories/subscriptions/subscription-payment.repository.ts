import { prisma } from '@/helpers/prisma';
import {
  CheckPaymentExpirationsRequest,
  GetSubscriptionPaymentBySlugRequest,
  UpdateSubscriptionPaymentRepositoryRequest,
} from '@/interfaces/subscription.interface';

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

  getSubscriptionPaymentBySlug = async (
    req: GetSubscriptionPaymentBySlugRequest,
  ) => {
    const subscriptionPayment =
      await this.prisma.subscriptionPayment.findUnique({
        where: {
          slug: req.slug,
        },
      });

    return {
      subscriptionPayment,
    };
  };

  checkPaymentExpirations = async (req?: CheckPaymentExpirationsRequest) => {
    const twoHoursAgo = new Date(new Date().getTime() - 2 * 60 * 60 * 1000);

    // Get expired subscription payments
    const expiredPayments = await this.prisma.subscriptionPayment.findMany({
      where: {
        ...(req?.userId && {
          subscription: {
            userId: req.userId,
          },
        }),
        paymentStatus: 'PENDING',
        createdAt: {
          lt: twoHoursAgo,
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
