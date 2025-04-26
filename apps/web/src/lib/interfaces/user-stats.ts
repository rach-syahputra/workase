export type SubscriptionPlanType = 'PROFESSIONAL' | 'STANDARD';

export interface IUserStats {
  assessment: {
    enrollmentCount: number;
  };
  subscription: {
    plan: SubscriptionPlanType | null;
    hasPendingTransaction: boolean;
  };
}
