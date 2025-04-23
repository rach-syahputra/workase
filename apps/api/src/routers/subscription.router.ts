import { Router } from 'express';

import SubscriptionController from '@/controllers/subscription.controller';
import { verifyDeveloper } from '@/middlewares/auth.middleware';
import { uploadPaymentProof } from '@/helpers/multer';

class SubscriptionRouter {
  private router: Router;
  private subscriptionController: SubscriptionController;

  constructor() {
    this.router = Router();
    this.subscriptionController = new SubscriptionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.subscriptionController.getSubscriptions);
    this.router.post('/', this.subscriptionController.addSubscription);
    this.router.put(
      '/payments/:subscriptionPaymentId',
      verifyDeveloper,
      this.subscriptionController.updateSubscriptionPayment,
    );
    this.router.put(
      '/payments/:subscriptionPaymentId/payment-proof/upload',
      uploadPaymentProof.single('paymentProof'),
      this.subscriptionController.uploadSubscriptionPaymentProof,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SubscriptionRouter;
