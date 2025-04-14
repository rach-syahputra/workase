import { ResponseError } from './error';
import { hbs } from './handlebars';
import { transporter } from '../helpers/nodemailer';

export const sendEmailVerification = async (
  data: string,
  token: string,
): Promise<void> => {
  try {
    const compiledTemplate = await hbs('template');
    const html = compiledTemplate({ data, token });
    transporter.sendMail({
      to: data,
      subject: 'Email Verification',
      html,
    });
  } catch (error) {
    new ResponseError(500, 'Failed to send email verification');
  }
};
