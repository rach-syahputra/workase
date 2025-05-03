import { AuthProvider, Gender, SubscriptionCategory } from '@prisma/client';

export interface UserLogin {
  id?: string;
  slug?: string;
  email: string;
  password?: string | null;
  authProvider: AuthProvider;
  isVerified?: boolean | null;
  location?: string | null;
  profilePhoto?: string | null;
  placeOfBirth?: string | null;
  gender?: Gender | null;
  lastEducation?: string | null;
  address?: string | null;
  jobId?: string | null;
  isDeleted?: boolean;
}

export interface GetUserStatsRequest {
  userId: string;
}

export interface GetUserDetailRequest {
  userSlug: string;
}
