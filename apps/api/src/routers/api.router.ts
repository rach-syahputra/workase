import { Router } from 'express';
import { jobsRouter } from './jobs.router';
import { usersRouter } from './users.route';
import { companiesRouter } from './companies.router';
import { authRouter } from './auth.router';
import SampleRouter from './sample.router';
import DeveloperRouter from './developer.router';
import CompanyReviewRouter from './company-review.router';
import SavedReviewRouter from './saved-review.router';
import SearchCompanyReviewRouter from './search-company-review.router';
import SkillRouter from './skill.router';
import AssessmentRouter from './assessment.router';
import UserAssessmentRouter from './user-assessment.router';
import CertificateRouter from './certificate.router';
import SubscriptionRouter from './subscription.router';
import SubscriptionPaymentRouter from './subscription-payment.router';
<<<<<<< HEAD
import CvRouter from './cv.router';
=======
import { jobApllicationsRouter } from './job-applications.router';
import { savedJobsRouter } from './saved-jobs.router';
>>>>>>> 178cd18 (feat: complete all core features for initial release)

const apiRouter = Router();
const sampleRouter = new SampleRouter();
const developerRouter = new DeveloperRouter();
const companyReviewRouter = new CompanyReviewRouter();
const savedReviewRouter = new SavedReviewRouter();
const searchCompanyReviewRouter = new SearchCompanyReviewRouter();
const skillRouter = new SkillRouter();
const assessmentRouter = new AssessmentRouter();
const userAssessmentRouter = new UserAssessmentRouter();
const certificateRouter = new CertificateRouter();
const subscriptionRouter = new SubscriptionRouter();
const subscriptionPaymentRouter = new SubscriptionPaymentRouter();
const cvRouter = new CvRouter();

apiRouter.use('/jobs', jobsRouter());
apiRouter.use('/users', usersRouter());
apiRouter.use('/auth', authRouter());
apiRouter.use('/companies', companiesRouter());
apiRouter.use('/samples', sampleRouter.getRouter());
apiRouter.use('/developers', developerRouter.getRouter());
apiRouter.use('/companies', companyReviewRouter.getRouter());
apiRouter.use('/saved-reviews', savedReviewRouter.getRouter());
apiRouter.use('/search', searchCompanyReviewRouter.getRouter());
apiRouter.use('/skills', skillRouter.getRouter());
apiRouter.use('/assessments', assessmentRouter.getRouter());
apiRouter.use('/user-assessments', userAssessmentRouter.getRouter());
apiRouter.use('/certificates', certificateRouter.getRouter());
apiRouter.use('/subscriptions', subscriptionRouter.getRouter());
apiRouter.use('/subscription-payments', subscriptionPaymentRouter.getRouter());
<<<<<<< HEAD
apiRouter.use('/cvs', cvRouter.getRouter());
=======
apiRouter.use('/job-applications', jobApllicationsRouter());
apiRouter.use('/saved-jobs', savedJobsRouter());
>>>>>>> 178cd18 (feat: complete all core features for initial release)

export default apiRouter;
