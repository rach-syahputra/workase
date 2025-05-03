import jobsController from '../controllers/job.controller';
// import { verifyToken } from '../middlewares/user.middleware';
import { Router } from 'express';
import validateJobFilter, {
  changeLocation,
} from '../middlewares/job.middleware';

export const jobsRouter = () => {
  const router = Router();
  router.get('/', changeLocation, validateJobFilter, jobsController.getJobs);

  return router;
};
