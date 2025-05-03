import { Router } from 'express';

import SubscriptionController from '../controllers/subscription.controller';
import { verifyUser } from '../middlewares/auth.middleware';

class SubscriptionPaymentRouter {
  private router: Router;
  private subscriptionController: SubscriptionController;

  constructor() {
    this.router = Router();
    this.subscriptionController = new SubscriptionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/:slug',
      verifyUser,
      this.subscriptionController.getSubscriptionPaymentBySlug,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SubscriptionPaymentRouter;
