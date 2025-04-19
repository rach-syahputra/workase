import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

import NextAuth, { Account, Profile } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { axiosPublic } from './lib/axios';
import { jwtDecode } from 'jwt-decode';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Credentials({
      id: 'user-login',
      async authorize(credentials) {
        try {
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
      async authorize(credentials) {
        try {
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
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.type = user.type;
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
      console.log('session 4:', session);
      return session;
    },

    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile | undefined;
    }): Promise<string | boolean> {
      if (account?.provider === 'google') {
        // return profile?.email?.endsWith('@gmail.com') || false;
        try {
          if ((account.type as string) == 'user') {
            const response = await axiosPublic.post('/auth/login/user', {
              email: profile?.email,
              authProvider: 'GOOGLE',
            });
            const user = response.data.data;
            user.type = 'user';
            return true;
          }
        } catch (error) {
          console.error(error);
        }
      }
      return true;
    },
  },
});
