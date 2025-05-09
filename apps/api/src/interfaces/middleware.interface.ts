import { AuthProvider, Gender } from '@prisma/client';
import { Request } from 'express';

export type RoleType = 'USER' | 'ADMIN' | 'DEVELOPER';

export interface CompanyToken {
  id: string;
  slug: string;
  name: string;
  email: string;
  authProvider: AuthProvider;
  phoneNumber: string;
  isVerified: boolean;
  logoUrl: string;
  descipton: string;
  category: string;
  location: string;
  role?: RoleType;
}
export interface UserToken {
  id: string;
  slug: string;
  email: string;
  authProvider: AuthProvider;
  isVerified: boolean;
  location: string;
  profilePhoto: string;
  placeOfBirth: string;
  gender: Gender;
  lastEducation: string;
  address: string;
  jobId: string;
  role: RoleType;
  name: string;
}

export interface DeveloperToken {
  id: string;
  email: string;
  role: RoleType;
  name: string;
  slug: string;
}
export interface UserRequest extends Request {
  user?: UserToken;
}

export interface DeveloperRequest extends Request {
  developer?: DeveloperToken;
}

export interface CompanyRequest extends Request {
  user?: CompanyToken;
}

export interface DeveloperRequest extends Request {
  developer?: DeveloperToken;
}

export interface UserAndDeveloperRequest extends Request {
  user?: UserToken;
  developer?: DeveloperToken;
}
