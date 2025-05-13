import * as Yup from 'yup';
const companyJobsFilterSchema = async () => {
  return Yup.object().shape({
    page: Yup.number().optional().min(1),
  });
};

export default companyJobsFilterSchema;
