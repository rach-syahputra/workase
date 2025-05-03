import { ICv } from './cv';

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

export interface IUser {
  id: string;
  slug: string;
  email: string;
  authProvider: string;
  skillId: string;
  profilePhoto: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  jobId: string;
  isPasswordReset: string;
  isDeleted: boolean;
}

export interface IBadge {
  id: string;
  slug: string;
  title: string;
  score: number;
}

export interface IUserDetail extends IUser {
  cv: ICv;
  badges: IBadge[];
}
