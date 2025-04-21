import { PrismaAdapter } from '@auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';
import { OAuthConfig } from 'next-auth/providers';
import NextAuth, { Account, Profile, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { axiosPublic } from './lib/axios';
import { jwtDecode } from 'jwt-decode';
import GoogleProvider from 'next-auth/providers/google';
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      id: 'google-user',
      name: 'Google (User)',
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          profilePhoto: profile.picture,
          type: 'user',
        };
      },
    }),
    Google({
      id: 'google-company',
      name: 'Google (Admin)',
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          profilePhoto: profile.picture,
          type: 'company',
        };
      },
    }),
    Credentials({
      id: 'user-login',
      name: 'User Credentials',
      async authorize(credentials) {
        try {
          console.log('ini credentials', credentials);
          const response = await axiosPublic.post('/auth/login/user', {
            email: credentials.email,
            password: credentials.password,
            authProvider: 'EMAIL',
          });
          const user = response.data.data;
          user.type = 'user';

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    Credentials({
      id: 'company-login',
      name: 'Company Credentials',
      async authorize(credentials) {
        try {
          console.log('ini credentials hanif', credentials);
          const response = await axiosPublic.post('/auth/login/company', {
            email: credentials.email,
            password: credentials.password,
            authProvider: 'EMAIL',
          });
          const user = response.data.data;
          user.type = 'company';
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.type = user.type;
        console.log('ini user', user);
      } else if (token.accessToken || trigger === 'update') {
        const { type } = token as { type: string };
        if (type == 'user') {
          const newToken = await axiosPublic.post('/users/token', undefined, {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          });
          token.accessToken = newToken.data.data.accessToken;
          token.refreshToken = newToken.data.data.refreshToken;
          token.type = token.type;
        } else {
          const newToken = await axiosPublic.post(
            '/companies/token',
            undefined,
            {
              headers: {
                Authorization: `Bearer ${token.refreshToken}`,
              },
            },
          );
          token.accessToken = newToken.data.data.accessToken;
          token.refreshToken = newToken.data.data.refreshToken;
          token.type = token.type;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        const user = jwtDecode(token.accessToken as string);
        if (user.role === 'USER') {
          session.user.role = user.role;
          session.user.id = user.id as string;
          session.user.email = user.email as string;

          session.user.authProvider = user.authProvider;
          session.user.isVerified = user.isVerified as boolean;
          session.user.location = user.location ?? '';
          session.user.profilePhoto = user.profilePhoto as string;
          session.user.placeOfBirth = user.placeOfBirth;
          session.user.gender = user.gender;
          session.user.lastEducation = user.lastEducation;
          session.user.address = user.address;
          session.user.jobId = user.jobId;
        } else if (user.role === 'ADMIN') {
          session.user.role = user.role;
          session.user.id = user.id as string;
          session.user.email = user.email as string;
          session.user.authProvider = user.authProvider;
          session.user.isVerified = user.isVerified;
          session.user.location = user.location;
          session.user.logoUrl = user.logoUrl;
          session.user.descipton = user.descipton;
          session.user.category = user.category;
          session.user.name = user.name;
          session.user.phoneNumber = user.phoneNumber;
          session.user.slug = user.slug;
        }
      }
      console.log('session 11:', session);
      return session;
    },

    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | undefined;
    }): Promise<string | boolean> {
      console.log('masuk ke sign in akhir', user.type);
      if (
        account?.provider === 'user-login' ||
        account?.provider === 'company-login'
      ) {
        return true;
      }
      if (user.type == 'user') {
        try {
          const response = await axiosPublic.post('/auth/login/user', {
            email: profile?.email,
            authProvider: 'GOOGLE',
          });
          user.accessToken = response.data.data.accessToken;
          user.refreshToken = response.data.data.refreshToken;
          user.type = 'user';
          console.log('ini harusnya user', user);
        } catch (e) {
          await axiosPublic.post('/auth/register/user', {
            email: profile?.email,
            authProvider: 'GOOGLE',
          });
        }
        return true;
      } else if (user.type == 'company') {
        try {
          console.log('masuk ke register woi', user.type);
          const response = await axiosPublic.post('/auth/login/company', {
            email: profile?.email,
            authProvider: 'GOOGLE',
          });
          user.accessToken = response.data.data.accessToken;
          user.refreshToken = response.data.data.refreshToken;
          user.type = 'company';
          console.log('ini harusnya company', user);
        } catch (e) {
          console.log('masuk ke register woi', e);
          await axiosPublic.post('/auth/register/company', {
            email: profile?.email,
            authProvider: 'GOOGLE',
          });
        }
      }
      console.log('masuk ke sign in woi', account?.provider);
      return true;
    },
  },
});
