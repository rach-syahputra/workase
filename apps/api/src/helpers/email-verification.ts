import { ResponseError } from './error';
import { hbs } from './handlebars';
import { transporter } from '../helpers/nodemailer';

export const sendEmailVerification = async (
  data: string,
  token: string,
  role: string,
): Promise<void> => {
  try {
    const compiledTemplate = await hbs('email-verification-template');
    const html = compiledTemplate({ data, token, role });
    transporter.sendMail({
      to: data,
      subject: 'Email Verification',
      html,
    });
  } catch (error) {
    throw new ResponseError(500, 'Failed to send email verification');
  }
};
