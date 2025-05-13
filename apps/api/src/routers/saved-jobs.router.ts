import savedJobsController from '../controllers/saved-jobs.controller';
import { verifyUser } from '../middlewares/auth.middleware';
import validateSavedJobsFilter from '../middlewares/saved-jobs.middleware';
import { Router } from 'express';

export const savedJobsRouter = () => {
  const router = Router();
  router.post('/', verifyUser, savedJobsController.saveJob);
  router.delete('/:jobId', verifyUser, savedJobsController.unsaveJob);
  router.get(
    '/',
    verifyUser,
    validateSavedJobsFilter,
    savedJobsController.getSavedJobs,
  );
  return router;
};
