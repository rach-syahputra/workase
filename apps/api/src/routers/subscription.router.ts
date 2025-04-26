import { Router } from 'express';

import SubscriptionController from '@/controllers/subscription.controller';
import {
  verifyDeveloper,
  verifyUser,
  verifyUserAndDeveloper,
} from '@/middlewares/auth.middleware';
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
    this.router.get(
      '/',
      verifyUserAndDeveloper,
      this.subscriptionController.getSubscriptions,
    );
    this.router.post(
      '/',
      verifyUser,
      this.subscriptionController.addSubscription,
    );
    this.router.get(
      '/transaction-status',
      verifyUser,
      this.subscriptionController.getSubscriptionTransactionStatus,
    );

    this.router.put(
      '/:subscriptionId/payments/:subscriptionPaymentId',
      verifyDeveloper,
      this.subscriptionController.updateSubscriptionPayment,
    );
    this.router.put(
      '/:subscriptionId/payments/:subscriptionPaymentId/payment-proof/upload',
      uploadPaymentProof.single('paymentProof'),
      verifyUser,
      this.subscriptionController.uploadSubscriptionPaymentProof,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export default SubscriptionRouter;
