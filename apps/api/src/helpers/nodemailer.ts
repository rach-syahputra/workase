import nodemailer from 'nodemailer';
import { node_account } from '../config';
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    ...node_account,
  },
});
