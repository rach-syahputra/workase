import 'next-auth';
import { AppSessionUser } from 'next-auth';
export type RoleType = 'USER' | 'ADMIN' | 'DEVELOPER';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    type?: 'user' | 'company';
    role?: string;
    id?: string;
    email?: string;
    authProvider?: string;
    isVerified?: boolean;
    location?: string;
    profilePhoto?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
    gender?: string;
    lastEducation?: string;
    address?: string;
    jobId?: string;
    logoUrl?: string;
    description?: string;
    category?: string;
    name?: string;
    phoneNumber?: string;
    slug?: string;
  }

  interface Session {
    role?: string;
    id?: string;
    email?: string;
    authProvider?: string;
    isVerified?: boolean;
    location?: string;
    profilePhoto?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
    gender?: string;
    lastEducation?: string;
    address?: string;
    jobId?: string;
    logoUrl?: string;
    description?: string;
    category?: string;
    name?: string;
    phoneNumber?: string;
    slug?: string;
  }
}

declare module 'jwt-decode' {
  interface JwtPayload {
    role?: string;
    id?: string;
    email?: string;
    authProvider?: string;
    isVerified?: boolean;
    location?: string;
    profilePhoto?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
    gender?: string;
    lastEducation?: string;
    address?: string;
    jobId?: string;
    logoUrl?: string;
    description?: string;
    category?: string;
    name?: string;
    phoneNumber?: string;
    slug?: string;
  }
}
