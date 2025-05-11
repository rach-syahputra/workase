import jobsController from '../controllers/job.controller';

import { Router } from 'express';
import validateJobsFilter, {
  changeLocation,
} from '../middlewares/job.middleware';

export const jobsRouter = () => {
  const router = Router();
  router.get('/', changeLocation, validateJobsFilter, jobsController.getJobs);
  router.get('/:slug', jobsController.getJobBySlug);
  return router;
};
