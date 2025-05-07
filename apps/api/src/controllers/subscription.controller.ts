import { NextFunction, Response } from 'express';

import { ApiResponse } from '../helpers/api-response';
import { ResponseError } from '../helpers/error';
import SubscriptionService from '../services/subscription.service';
import {
  DeveloperRequest,
  UserAndDeveloperRequest,
  UserRequest,
} from '../interfaces/middleware.interface';
import { OrderType } from '../interfaces/filter.interface';
import { PaymentStatus, SubscriptionCategory } from '@prisma/client';

class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  addSubscription = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.subscriptionService.addSubscription({
        userId: req.user.id,
        totalPrice: req.body.totalPrice,
        category: req.body.category,
        paymentStatus: req.body.paymentStatus,
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
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.subscriptionService.updateSubscriptionPayment({
        subscriptionId: req.params.subscriptionId,
        userId: req.user.id,
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
        subscriptionId: req.params.subscriptionId,
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
    req: UserAndDeveloperRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user && !req.developer)
        throw new ResponseError(401, 'Unauthenticated');

      const data = await this.subscriptionService.getSubscriptions({
        userId: req?.user?.id || '',
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        order: req.query.order as OrderType,
        paymentStatuses: (typeof req.query.status === 'string'
          ? req.query.status.split(',')
          : Array.isArray(req.query.status)
            ? req.query.status
            : undefined) as PaymentStatus[],
        category: req.query.category as SubscriptionCategory,
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

  getSubscriptionPaymentBySlug = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) throw new ResponseError(401, 'Unauthenticated');

      const data = await this.subscriptionService.getSubscriptionPaymentBySlug({
        slug: req.params.slug,
      });

      ApiResponse({
        res,
        statusCode: 200,
        message: 'Subscription payment retrieved successfully.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default SubscriptionController;
