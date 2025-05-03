import { format } from 'date-fns';

import { SendSubscriptionExpiryReminderEmailRequest } from '../..//interfaces/subscription.interface';
import { hbs } from '../handlebars';
import { transporter } from '../nodemailer';
import { ResponseError } from '../error';

export const sendSubscriptionExpiryReminderEmail = async (
  req: SendSubscriptionExpiryReminderEmailRequest[],
) => {
  try {
    const compiledTemplate = await hbs('subscription-expiry-reminder');

    for (const data of req) {
      const expirationDate = format(data.expirationDate, 'yyyy-MM-dd HH:mm:ss');

      const html = compiledTemplate({
        subscriptionPlan: data.subscriptionPlan,
        expirationDate,
      });

      transporter.sendMail({
        to: data.destinationEmail,
        subject: 'Your subscription is ending soon — renew to stay connected',
        html,
      });
    }
  } catch (error) {
    throw new ResponseError(
      500,
      'Failed to send subscription expiry reminder email',
    );
  }
};
