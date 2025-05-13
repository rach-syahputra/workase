import { Router } from 'express';
import { verifyUser } from '../middlewares/auth.middleware';
import { uploadCVPdf } from '../helpers/multer';
import jobApplicationsController from '../controllers/job-applications.controller';
import {
  uploadToCloudinary,
  validateApplicationsFilter,
  validateApplyJobInput,
} from '../middlewares/applied-jobs.middleware';

export const jobApllicationsRouter = () => {
  const router = Router();
  router.post(
    '/:jobId/apply',
    verifyUser,
    uploadCVPdf.single('cv'),
    validateApplyJobInput,
    uploadToCloudinary,
    jobApplicationsController.applyJob,
  );
  router.get(
    '/applications',
    verifyUser,
    validateApplicationsFilter,
    jobApplicationsController.getJobApplications,
  );
  router.get(
    '/:jobApplicationId',
    verifyUser,
    jobApplicationsController.getJobApplicationById,
  );
  return router;
};
