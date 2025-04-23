import * as yup from 'yup';

export const addSubscriptionSchema = yup
  .object()
  .shape({
    category: yup
      .string()
      .typeError('Category must be a text')
      .required('Category is required'),
    paymentStatus: yup
      .string()
      .typeError('Payment status must be a text')
      .required('Payment status is required'),
  })
  .strict();
