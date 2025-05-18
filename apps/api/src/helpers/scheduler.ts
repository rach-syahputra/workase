import cron from 'node-cron';
import { prisma } from './prisma';
import { sendSubscriptionExpiryReminderEmail } from './emails/subscription-expiry-reminder-email';

export const subscriptionExpiryReminderEmail = () => {
  cron.schedule(
    '0 12 * * *',
    async () => {
      // current time
      const now = new Date();

      // tomorrow at 00:00
      const startOfTomorrow = new Date(now);
      startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
      startOfTomorrow.setHours(0, 0, 0, 0);

      // tomorrow at 23:59:59
      const endOfTomorrow = new Date(now);
      endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);
      endOfTomorrow.setHours(23, 59, 59, 999);

      // query subscriptions expiring tomorrow
      const subscriptions = await prisma.subscription.findMany({
        where: {
          expiresAt: {
            gte: startOfTomorrow,
            lt: endOfTomorrow,
            not: null,
          },
        },
        select: {
          user: {
            select: {
              email: true,
            },
          },
          category: true,
          expiresAt: true,
        },
      });

      await sendSubscriptionExpiryReminderEmail(
        subscriptions.map((subscription) => ({
          destinationEmail: subscription.user.email,
          expirationDate: new Date(subscription.expiresAt!),
          subscriptionPlan: subscription.category,
        })),
      );
    },
    {
      timezone: 'Asia/Jakarta',
    },
  );
};
