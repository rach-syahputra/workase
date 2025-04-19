// import type { NextAuthConfig, User } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { axiosPublic } from './lib/axios';

// const authConfig: NextAuthConfig = {
//   session: {
//     strategy: 'jwt' as const,
//     maxAge: 60 * 60, // 1 jam
//   },
//   providers: [
//     CredentialsProvider({
//       // id: 'user-login',
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         console.log('ini credentials', credentials);
//         try {
//           if (!credentials) return null;
//           const response = await axiosPublic.post('/auth/login/user', {
//             credentials,
//             // email: credentials.email,
//             // password: credentials.password,
//             // authProvider: credentials.authProvider || 'EMAIL',
//           });
//           return {
//             accessToken: response.data.data.accessToken,
//             refreshToken: response.data.data.refreshToken,
//             type: 'user',
//           } as User;
//         } catch (error) {
//           console.error('Authorize error:', error);
//           return null;
//         }
//       },
//     }),
//     // CredentialsProvider({
//     //   id: 'company-login',
//     //   name: 'Company',
//     //   credentials: {
//     //     email: { label: 'Email', type: 'text' },
//     //     password: { label: 'Password', type: 'password' },
//     //     authProvider: { label: 'authProvider', type: 'text' },
//     //   },
//     //   async authorize(credentials) {
//     //     try {
//     //       if (!credentials) return null;
//     //       const response = await axiosPublic.post('/auth/login/company', {
//     //         email: credentials.email,
//     //         password: credentials.password,
//     //         authProvider: credentials.authProvider || 'EMAIL',
//     //       });
//     //       return {
//     //         accessToken: response.data.data.accessToken,
//     //         refreshToken: response.data.data.refreshToken,
//     //         type: 'company',
//     //       };
//     //     } catch (error) {
//     //       console.error('Company login error:', error);
//     //       return null;
//     //     }
//     //   },
//     // }),
//   ],
//   callbacks: {
//     async jwt({ token, user, trigger }) {
//       if (user) {
//         const { accessToken, refreshToken, type } = user;
//         return {
//           accessToken,
//           refreshToken,
//           type,
//         };
//       } else if (token?.refreshToken || trigger === 'update') {
//         // if (token.type === 'company') {
//         //   // const newToken = await axiosPublic.post('/companies/token', {
//         //   //   headers: {
//         //   //     Authorization: `Bearer ${token.refreshToken}`,
//         //   //   },
//         //   // });
//         //   // return {
//         //   //   accessToken: newToken.data.data.accessToken,
//         //   //   refreshToken: newToken.data.data.refreshToken,
//         //   //   type: 'company',
//         //   // };
//         // }
//         if (token.type === 'user') {
//           const newToken = await axiosPublic.post('/users/token', null, {
//             headers: {
//               Authorization: `Bearer ${token.refreshToken}`,
//             },
//           });
//           return {
//             accessToken: newToken.data.data.accessToken,
//             refreshToken: newToken.data.data.refreshToken,
//             type: 'user',
//           };
//         }
//         return {
//           accessToken: token.accessToken,
//           refreshToken: token.refreshToken,
//           type: token.type,
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.accessToken = token.accessToken as string;
//       if (token.type === 'user' || token.type === 'company') {
//         session.user.type = token.type;
//       }
//       return session;
//     },
//   },
// };

// export default authConfig;
