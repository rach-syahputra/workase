import { Router } from 'express';
import { jobsRouter } from './job.router';
import { usersRouter } from './user.route';
import { companiesRouter } from './company.router';

const apiRouter = Router();

apiRouter.use('/jobs', jobsRouter());
apiRouter.use('/users', usersRouter());
apiRouter.use('/companies', companiesRouter());

export default apiRouter;
