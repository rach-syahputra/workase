import * as Yup from 'yup';
export const CompanyRegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(8, 'Password must be at least 8 characters'),
  phoneNumber: Yup.string()
    .required()
    .min(8, 'phone number must be at least 8 characters')
    .max(15, 'phone number must be at most 15 characters')
    .matches(/^[0-9\s]+$/, 'Invalid phone number format'),
});
