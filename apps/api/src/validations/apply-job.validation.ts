import { ResponseError } from '../helpers/error';
import prisma from '../prisma';
import * as Yup from 'yup';

const validUserAppliedJob = async () => {
  return async function (jobId: string, userId: string): Promise<boolean> {
    try {
      const existingApplication = await prisma.appliedJob.findFirst({
        where: {
          jobId: jobId,
          userId: userId,
        },
      });
      return !existingApplication;
    } catch (error) {
      new ResponseError(500, 'error checking job application');
      return false;
    }
  };
};
const applyJobSchema = async () => {
  const checkUserAppliedJob = await validUserAppliedJob();
  return Yup.object().shape({
    jobId: Yup.string().required('Job ID is required'),
    userId: Yup.string().required('User ID is required'),
    salaryEstimate: Yup.number().required('Salary estimate is required'),
    userApplication: Yup.mixed().test(
      'not-alredy-applied',
      'You have already applied for this job',
      async function (_, context) {
        const { jobId, userId } = context.parent;
        return await checkUserAppliedJob(jobId, userId);
      },
    ),
  });
};
export default applyJobSchema;
