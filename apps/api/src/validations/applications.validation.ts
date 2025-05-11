import * as Yup from 'yup';
const applicationsFilterSchema = async () => {
  return Yup.object().shape({
    limit: Yup.number().positive('Limit must be a positive number').integer(),
    skip: Yup.number().min(0, 'Skip must be non-negative').integer(),
    sortField: Yup.string().optional(),
    sortOrder: Yup.string().oneOf(['asc', 'desc'], 'invalid sort order'),
    title: Yup.string().optional(),
  });
};
export default applicationsFilterSchema;
