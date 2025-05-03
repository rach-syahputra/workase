import { CLOUDINARY_SUBSCRIPTION_PAYMENT_PROOF_FOLDER } from '../config';
import ImageRepository from '../repositories/cloudinary/image.repository';
import SubscriptionRepository from '../repositories/subscriptions/supscription.repository';
import SubscriptionPaymentRepository from '../repositories/subscriptions/subscription-payment.repository';
import {
  AddSubscriptionRequest,
  CheckPaymentExpirationsRequest,
  GetSubscriptionPaymentBySlugRequest,
  GetSubscriptionsRequest,
  GetSubscriptionTransactionStatusRequest,
  UpdateSubscriptionPaymentServiceRequest,
  VerifySubscriptionOwnerRequest,
} from '../interfaces/subscription.interface';
import {
  addSubscriptionSchema,
  updateSubscriptionPaymentSchema,
} from '../validations/subscription.validation';
import { validate } from '../helpers/validation';
import { ResponseError } from '../helpers/error';

class SubscriptionService {
  private imageRepository: ImageRepository;
  private subscriptionRepository: SubscriptionRepository;
  private subscriptionPaymentRepository: SubscriptionPaymentRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
    this.subscriptionRepository = new SubscriptionRepository();
    this.subscriptionPaymentRepository = new SubscriptionPaymentRepository();
  }

  addSubscription = async (req: AddSubscriptionRequest) => {
    validate(addSubscriptionSchema, req);

    return await this.subscriptionRepository.addSupscription({
      totalPrice: req.totalPrice,
      userId: req.userId,
      category: req.category,
      paymentStatus: req.paymentStatus,
    });
  };

  updateSubscriptionPayment = async (
    req: UpdateSubscriptionPaymentServiceRequest,
  ) => {
    validate(updateSubscriptionPaymentSchema, req);

    let paymentProof;

    if (req.paymentProof) {
      paymentProof = await this.imageRepository.upload(
        req.paymentProof.path,
        CLOUDINARY_SUBSCRIPTION_PAYMENT_PROOF_FOLDER,
      );
    }

    return await this.subscriptionPaymentRepository.updateSubscriptionPayment({
      subscriptionPaymentId: req.subscriptionPaymentId,
      paymentProof: paymentProof?.secure_url,
      approvedBy: req.approvedBy,
      paymentStatus: req.paymentStatus,
    });
  };

  getSubscriptions = async (req: GetSubscriptionsRequest) => {
    await this.checkPaymentExpirations({ userId: req.userId });

    return await this.subscriptionRepository.getSubscriptions(req);
  };

  verifySubscriptionOwner = async (req: VerifySubscriptionOwnerRequest) => {
    const { subscription } =
      await this.subscriptionRepository.getSubscriptionById({
        subscriptionId: req.subscriptionId,
      });

    if (subscription?.userId !== req.userId) {
      throw new ResponseError(
        403,
        `You don't have access to this subscription`,
      );
    }
  };

  getSubscriptionPaymentBySlug = async (
    req: GetSubscriptionPaymentBySlugRequest,
  ) => {
    return await this.subscriptionPaymentRepository.getSubscriptionPaymentBySlug(
      req,
    );
  };

  checkPaymentExpirations = async (req: CheckPaymentExpirationsRequest) => {
    return await this.subscriptionPaymentRepository.checkPaymentExpirations(
      req,
    );
  };
}

export default SubscriptionService;
