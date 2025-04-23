import 'next-auth';
import { AppSessionUser } from 'next-auth';
export type RoleType = 'USER' | 'ADMIN' | 'DEVELOPER';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    type?: 'user' | 'company' | 'developer';
    role?: string;
    id?: string;
    email?: string;
    authProvider?: string;
    isVerified?: boolean;
    location?: string;
    profilePhoto?: string;
    placeOfBirth?: string;
    gender?: string;
    lastEducation?: string;
    address?: string;
    jobId?: string;
    logoUrl?: string;
    descipton?: string;
    category?: string;
    name?: string;
    phoneNumber?: string;
    slug?: string;
  }
  //   interface AppUser {
  //     id: string;
  //     slug: string;
  //     email: string;
  //     authProvider: AuthProvider;
  //     isVerified: boolean;
  //     location: string;
  //     profilePhoto: string;
  //     placeOfBirth: string;
  //     gender: Gender;
  //     lastEducation: string;
  //     address: string;
  //     jobId: string;
  //     role: RoleType;
  //   }

  //   interface AppCompany {
  //     id: string;
  //     slug: string;
  //     name: string;
  //     email: string;
  //     authProvider: AuthProvider;
  //     phoneNumber: string;
  //     isVerified: boolean;
  //     logoUrl: string;
  //     descipton: string;
  //     category: string;
  //     location: string;
  //     role?: RoleType;
  //   }

  //   type AppSessionUser = AppUser | AppCompany;

  interface Session {
    role?: string;
    id?: string;
    email?: string;
    authProvider?: string;
    isVerified?: boolean;
    location?: string;
    profilePhoto?: string;
    placeOfBirth?: string;
    gender?: string;
    lastEducation?: string;
    address?: string;
    jobId?: string;
    logoUrl?: string;
    descipton?: string;
    category?: string;
    name?: string;
    phoneNumber?: string;
    slug?: string;
  }
}

// declare module 'next-auth/jwt' {
//   interface JWT extends AppSessionUser {}
// }

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
    gender?: string;
    lastEducation?: string;
    address?: string;
    jobId?: string;
    logoUrl?: string;
    descipton?: string;
    category?: string;
    name?: string;
    phoneNumber?: string;
    slug?: string;
  }
}
