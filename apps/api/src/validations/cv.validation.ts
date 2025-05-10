import * as yup from 'yup';

export const addCvSchema = yup
  .object()
  .shape({
    userId: yup
      .string()
      .typeError('User ID must be a string')
      .required('User ID is required'),
    data: yup.object().shape({
      header: yup.object().shape({
        content: yup.object().shape({
          email: yup
            .string()
            .email()
            .typeError('Header content email must be an email')
            .required('Header content email is required'),
        }),
      }),
    }),
    template: yup
      .number()
      .typeError('Template must be a number')
      .required('Tempalte is number')
      .optional(),
  })
  .strict(true);

export const updateCvSchema = yup
  .object()
  .shape({
    cvId: yup
      .string()
      .typeError('CV ID must be a string')
      .required('CV ID is required'),
    userId: yup
      .string()
      .typeError('User ID must be a string')
      .required('User ID is required'),
    data: yup.object().shape({
      header: yup.object().shape({
        content: yup.object().shape({
          email: yup
            .string()
            .email()
            .typeError('Header content email must be an email')
            .required('Header content email is required'),
          name: yup
            .string()
            .typeError('Header content name must be a string')
            .required('Header content name is required'),
          role: yup
            .string()
            .typeError('Header content role must be a string')
            .required('Header content role is required'),
          phoneNumber: yup
            .string()
            .typeError('Header content phone number must be a string')
            .required('Header content phone number is required'),
        }),
      }),
      summary: yup.object().shape({
        content: yup
          .string()
          .typeError('Summary content must be a string')
          .required('Summary content is required'),
      }),
      template: yup
        .number()
        .typeError('Template must be a number')
        .required('Template is required')
        .optional(),
    }),
  })
  .strict(true);
