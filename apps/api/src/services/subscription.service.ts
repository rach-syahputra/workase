import { CLOUDINARY_SUBSCRIPTION_PAYMENT_PROOF_FOLDER } from '@/config';
import ImageRepository from '@/repositories/cloudinary/image.repository';
import SubscriptionRepository from '@/repositories/subscriptions/supscription.repository';
import {
  AddSubscriptionRequest,
  GetSubscriptionsRequest,
  UpdateSubscriptionPaymentServiceRequest,
} from '@/interfaces/subscription.interface';
import {
  addSubscriptionSchema,
  updateSubscriptionPaymentSchema,
} from '@/validations/subscription.validation';
import { validate } from '@/helpers/validation';

class SubscriptionService {
  private imageRepository: ImageRepository;
  private subscriptionRepository: SubscriptionRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
    this.subscriptionRepository = new SubscriptionRepository();
  }

  addSubscription = async (req: AddSubscriptionRequest) => {
    validate(addSubscriptionSchema, req);

    return await this.subscriptionRepository.addSupscription({
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

    return await this.subscriptionRepository.updateSubscriptionPayment({
      subscriptionPaymentId: req.subscriptionPaymentId,
      paymentProof: paymentProof?.secure_url,
      approvedBy: req.approvedBy,
      paymentStatus: req.paymentStatus,
    });
  };

  getSubscriptions = async (req: GetSubscriptionsRequest) => {
    return await this.subscriptionRepository.getSubscriptions(req);
  };
}

export default SubscriptionService;
