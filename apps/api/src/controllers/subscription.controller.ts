import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '@/helpers/api-response';
import { ResponseError } from '@/helpers/error';
import SubscriptionService from '@/services/subscription.service';
import { DeveloperRequest } from '@/interfaces/middleware.interface';
import { OrderType } from '@/interfaces/filter.interface';

class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  addSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TO DO: retrieve user token from session

      const data = await this.subscriptionService.addSubscription({
        category: req.body.category,
        paymentStatus: req.body.paymentStatus,
        userId: 'ndy-01',
      });

      ApiResponse({
        res,
        statusCode: 201,
        message: 'Subscription and payment created successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  uploadSubscriptionPaymentProof = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // TO DO: retrieve user token from session
      const data = await this.subscriptionService.updateSubscriptionPayment({
        subscriptionPaymentId: req.params.subscriptionPaymentId,
        paymentProof: req.file!,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Subscription and payment updated successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  updateSubscriptionPayment = async (
    req: DeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.developer) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.subscriptionService.updateSubscriptionPayment({
        subscriptionPaymentId: req.params.subscriptionPaymentId,
        approvedBy: req.body.approvedBy,
        paymentStatus: req.body.paymentStatus,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Subscription and payment updated successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getSubscriptions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // TO DO: retrieve user token from session

      const data = await this.subscriptionService.getSubscriptions({
        userId: 'ndy-01',
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        order: req.query.order as OrderType,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Subscriptions and payment retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default SubscriptionController;
