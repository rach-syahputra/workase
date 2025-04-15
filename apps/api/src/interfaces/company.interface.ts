import { AuthProvider } from '@prisma/client';

export interface CompanyLogin {
  id: String;
  slug: String;
  name: String;
  email: String;
  password?: String;
  authProvider: AuthProvider;
  authId?: String | null;
  phoneNumber?: String | null;
  isVerified?: Boolean | null;
  logoUrl?: String | null;
  description?: String | null;
  category?: String | null;
  location?: String | null;
  isDeleted?: Boolean | null;
}
