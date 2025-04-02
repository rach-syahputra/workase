import * as yup from 'yup';

export const addCompanyReviewSchema = yup
  .object()
  .shape({
    companyId: yup
      .string()
      .typeError('Company ID must be a string')
      .required('Company ID is required'),
    title: yup
      .string()
      .typeError('Title must be a string')
      .required('Title is required')
      .min(5, 'Title must be at least 5 characters'),
    salaryEstimate: yup
      .number()
      .typeError('Salary estimate must be a number')
      .required('Salary estimate is required'),
    rating: yup.object().shape({
      workCulture: yup
        .number()
        .typeError('Work culture rating must be a number')
        .required('Work culture rating is required'),
      workLifeBalance: yup
        .number()
        .typeError('Work-life balance rating must be a number')
        .required('Work-life balance rating is required'),
      facilities: yup
        .number()
        .typeError('Facilities rating must be a number')
        .required('Facilities rating is required'),
      careerGrowth: yup
        .number()
        .typeError('Career growth rating must be a number')
        .required('Career growth rating is required'),
    }),
    content: yup
      .string()
      .typeError('Content must be a string')
      .required('Content is required')
      .min(20, 'Content must be at least 20 characters'),
  })
  .strict(true);
