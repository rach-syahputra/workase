import { Router } from 'express';
import { jobsRouter } from './job.router';
import { usersRouter } from './user.route';
import { companiesRouter } from './company.router';
import { authRouter } from './auth.router';
import SampleRouter from './sample.router';
import DeveloperRouter from './developer.router';
import CompanyReviewRouter from './company-review.router';
import SearchCompanyReviewRouter from './search-company-review.router';
import AssessmentRouter from './assessment.router';
import UserAssessmentRouter from './user-assessment';

const apiRouter = Router();
const sampleRouter = new SampleRouter();
const developerRouter = new DeveloperRouter();
const companyReviewRouter = new CompanyReviewRouter();
const searchCompanyReviewRouter = new SearchCompanyReviewRouter();
const assessmentRouter = new AssessmentRouter();
const userAssessmentRouter = new UserAssessmentRouter();

apiRouter.use('/jobs', jobsRouter());
apiRouter.use('/users', usersRouter());
apiRouter.use('/auth', authRouter());
apiRouter.use('/companies', companiesRouter());
apiRouter.use('/samples', sampleRouter.getRouter());
apiRouter.use('/developers', developerRouter.getRouter());
apiRouter.use('/companies', companyReviewRouter.getRouter());
apiRouter.use('/search', searchCompanyReviewRouter.getRouter());
apiRouter.use('/assessments', assessmentRouter.getRouter());
apiRouter.use('/user-assessments', userAssessmentRouter.getRouter());

export default apiRouter;
