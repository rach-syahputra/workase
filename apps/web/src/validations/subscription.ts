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

export const paymentSchema = yup
  .object()
  .shape({
    subscriptionId: yup
      .string()
      .typeError('Subscription ID must be a text')
      .required('Subscription ID is required'),
    subscriptionPaymentId: yup
      .string()
      .typeError('Subscription payment ID must be a text')
      .required('Subscription payment ID is required'),
    paymentProof: yup
      .mixed<File>()
      .required('Payment proof is required')
      .test(
        'fileFormat',
        'Only image files are allowed (jpg, jpeg, png)',
        (value) => {
          if (!value) return true;
          return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
        },
      ),
  })
  .strict(true);
