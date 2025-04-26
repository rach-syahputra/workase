import * as yup from 'yup';

export const developerLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .typeError('Email must be a text')
    .required('Email is required'),
  password: yup
    .string()
    .typeError('Password must be a text')
    .required('Password is required'),
});
