import { Router } from 'express';
import { jobsRouter } from './jobs.router';
import { usersRouter } from './users.route';
import { companiesRouter } from './companies.router';
import { authRouter } from './auth.router';

const apiRouter = Router();

apiRouter.use('/jobs', jobsRouter());
apiRouter.use('/users', usersRouter());
apiRouter.use('/auth', authRouter());
apiRouter.use('/companies', companiesRouter());

export default apiRouter;
