import NextAuth, { Account, Profile, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { jwtDecode } from 'jwt-decode';
import GoogleProvider from 'next-auth/providers/google';
import {
  loginCompanyWithEmail,
  loginCompanyWithGoogle,
  loginUserWithEmail,
  loginUserWithGoogle,
  refreshCompanyToken,
  refreshUserToken,
  registerUserWithGoogle,
} from './lib/apis/authentication';
import { developerLogin } from './lib/apis/developer';
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
        const user = await loginUserWithEmail(
          credentials.email as string,
          credentials.password as string,
        );
        return user;
      },
    }),
    Credentials({
      id: 'company-login',
      name: 'Company Credentials',
      async authorize(credentials) {
        const user = await loginCompanyWithEmail(
          credentials.email as string,
          credentials.password as string,
        );
        return user;
      },
    }),
    Credentials({
      id: 'developer-login',
      name: 'Developer Credentials',
      async authorize(credentials) {
        const response = await developerLogin({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (response.error) {
          return null;
        }
        const developer = response.data as User;
        developer.type === 'developer';

        return developer;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | undefined;
    }): Promise<string | boolean> {
      if (
        account?.provider === 'user-login' ||
        account?.provider === 'company-login' ||
        account?.provider === 'developer-login'
      ) {
        return true;
      }
      const { email } = profile as Profile;
      if (user.type == 'user') {
        try {
          const response = await loginUserWithGoogle(email as string);
          user.accessToken = response.data.data.accessToken;
          user.refreshToken = response.data.data.refreshToken;
          user.type = 'user';
        } catch (e) {
          await registerUserWithGoogle(email as string);
        }
        return true;
      } else if (user.type == 'company') {
        try {
          const response = await loginCompanyWithGoogle(email as string);
          user.accessToken = response.data.data.accessToken;
          user.refreshToken = response.data.data.refreshToken;
          user.type = 'company';
        } catch (e) {
          await registerUserWithGoogle(email as string);
        }
      } else if (user.type == 'developer') {
        return true;
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        const userForMiddleware = jwtDecode(user.accessToken as string);
        token.isVerified = userForMiddleware.isVerified as boolean;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.type = user.type;
      } else if (token.accessToken || trigger === 'update') {
        const { type } = token as { type: string };
        if (type == 'user') {
          const newToken = await refreshUserToken(token.refreshToken as string);
          token.accessToken = newToken.accessToken;
          token.refreshToken = newToken.refreshToken;
          const userForMiddleware = jwtDecode(newToken.accessToken as string);
          token.isVerified = userForMiddleware.isVerified as boolean;
          token.type = token.type;
        } else if (type == 'company') {
          const newToken = await refreshCompanyToken(
            token.refreshToken as string,
          );
          token.accessToken = newToken.accessToken;
          token.refreshToken = newToken.refreshToken;
          const userForMiddleware = jwtDecode(newToken.accessToken as string);
          token.isVerified = userForMiddleware.isVerified as boolean;
          token.type = token.type;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        const user = jwtDecode(token.accessToken as string);
        session.user.role = user.role;
        session.user.isVerified = user.isVerified as boolean;
        session.user.location = user.location ?? '';
        session.user.profilePhoto = user.profilePhoto as string;
        session.user.placeOfBirth = user.placeOfBirth;
        session.user.dateOfBirth = user.dateOfBirth;
        session.user.gender = user.gender;
        session.user.lastEducation = user.lastEducation;
        session.user.address = user.address;
        session.user.jobId = user.jobId;
        session.user.id = user.id as string;
        session.user.email = user.email as string;
        session.user.authProvider = user.authProvider;
        session.user.logoUrl = user.logoUrl;
        session.user.description = user.description;
        session.user.category = user.category;
        session.user.name = user.name;
        session.user.phoneNumber = user.phoneNumber;
        session.user.slug = user.slug;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});
