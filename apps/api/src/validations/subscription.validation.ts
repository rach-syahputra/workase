import * as yup from 'yup';

const MAX_IMAGE_SIZE = 1024000; // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const addSubscriptionSchema = yup
  .object()
  .shape({
    userId: yup.string().required('User ID is required'),
    category: yup.string().required('Category is required'),
    paymentStatus: yup.string().required('Payment status is required'),
  })
  .strict();

export const updateSubscriptionPaymentSchema = yup
  .object()
  .shape({
    subscriptionPaymentId: yup.string(),
    paymentStatus: yup.string().nullable(),
    paymentProof: yup
      .mixed<Express.Multer.File>()
      .test('fileType', 'Image format is not supported', (file) => {
        return file ? ACCEPTED_IMAGE_TYPES.includes(file.mimetype) : true;
      })
      .test('fileSize', 'Max image size is 1MB', (file) => {
        return file ? file.size <= MAX_IMAGE_SIZE : true;
      })
      .nullable(),
  })
  .strict();
