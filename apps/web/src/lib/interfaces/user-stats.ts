import { ICv } from './cv';

export type SubscriptionPlanType = 'PROFESSIONAL' | 'STANDARD';

export interface IUserStats {
  subscription: {
    id: string;
    assessmentEnrollmentCount: number;
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
  certificateSlug: string;
}

export interface ICompany {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  logoUrl: string;
  description: string;
  category: string;
  location: string;
  slug: string;
  role: string;
}

export interface IUserDetail extends IUser {
  cv: ICv;
  badges: IBadge[];
  company: ICompany;
}

export interface ICurrentCompany {
  id: string;
  name: string;
  jobTitle: string;
  slug: string;
}

export interface IUserMetadata {
  profilePhoto: string | null;
  summary: string | null;
}
