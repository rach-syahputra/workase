import * as yup from 'yup';

export const addSkillSchema = yup.object().shape({
  title: yup
    .string()
    .typeError('Title must be a text')
    .min(5, 'Title must have at least 5 characters.')
    .required('Title is required'),
});
