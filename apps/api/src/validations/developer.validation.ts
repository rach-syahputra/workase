import * as yup from 'yup';

export const loginDeveloperSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email()
      .typeError('Email must be an email')
      .required('Email is required'),
    password: yup
      .string()
      .typeError('Password must be a string')
      .required('Password is required'),
  })
  .strict(true);
