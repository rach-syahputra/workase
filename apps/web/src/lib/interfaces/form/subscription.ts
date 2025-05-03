export interface AddSubscriptionFormValues {
  category: 'STANDARD' | 'PROFESSIONAL';
  paymentStatus: 'PENDING';
}

export interface PaymentFormValues {
  subscriptionId: string;
  subscriptionPaymentId: string;
  paymentProof: File | null;
}
