export type SubscriptionPlanType = 'PROFESSIONAL' | 'STANDARD';

export interface IUserStats {
  assessment: {
    enrollmentCount: number;
  };
  subscription: {
    plan: SubscriptionPlanType | 'FREE';
    hasPendingTransaction: boolean;
    expiresAt: string;
  };
}
