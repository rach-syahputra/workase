import { Router } from 'express';
import { jobsRouter } from './job.router';

const apiRouter = Router();

apiRouter.use('/jobs', jobsRouter());

export default apiRouter;
