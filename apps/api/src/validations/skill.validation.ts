import * as yup from 'yup';

export const addSkillSchema = yup
  .object()
  .shape({
    title: yup
      .string()
      .typeError('Title must be a string')
      .required('Title is required')
      .max(20, 'Title must be less than 20 characters'),
  })
  .strict(true);
