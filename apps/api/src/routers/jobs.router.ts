<<<<<<< HEAD
import jobsController from '../controllers/job.controller';
// import { verifyToken } from '../middlewares/user.middleware';
=======
import jobsController from '@/controllers/job.controller';

>>>>>>> 178cd18 (feat: complete all core features for initial release)
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
