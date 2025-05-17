import * as Yup from 'yup';
import { ResponseError } from '../helpers/error';

import { AuthProvider, Gender } from '@prisma/client';
import { getUserByEmail } from '../helpers/user.prisma';
import { UserLogin } from '../interfaces/user.interface';

const checkUserExists = async (email: string) => {
  const user = (await getUserByEmail(email)) as UserLogin;
  if (user) {
    throw new ResponseError(404, 'User has been exists');
  }
};

const authProvider = async (authProvider: string, password: string) => {
  if (authProvider === 'GOOGLE' && password) {
    throw new ResponseError(
      400,
      'User uses a thirt-party service for registration, so user doesn`t need reset his password',
    );
  }
  return true;
};

const userProfileUpdateSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .optional()
      .email('Invalid email format')
      .test('check-User-exists', 'User has been exists', async (value) => {
        if (value) {
          try {
            await checkUserExists(value);
            return true;
          } catch (error) {
            return false;
          }
        }
        return true;
      }),
    currentPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .test(
        'current-required-if-new',
        'Current password is required when changing password',
        function (value) {
          const newPassword = this.parent.newPassword;
          if (newPassword && !value) {
            return false;
          }
          return true;
        },
      ),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .test(
        'new-required-if-current',
        'New password is required when current password is filled',
        function (value) {
          const currentPassword = this.parent.currentPassword;
          if (currentPassword && !value) {
            return false;
          }
          return true;
        },
      ),
    placeOfBirth: Yup.string().optional(),
    dateOfBirth: Yup.string().optional(),
    gender: Yup.string().optional().oneOf(Object.values(Gender)),
    lastEducation: Yup.string().optional(),
    address: Yup.string().optional(),
    authProvider: Yup.string()
      .optional()
      .oneOf(Object.values(AuthProvider))
      .test(
        'check-auth-provider',
        'If Auth provider is Google, user doesn`t need reset his password',
        async function (value) {
          const password = this.parent.currentPassword;
          if (value) {
            try {
              await authProvider(value, password);
              return true;
            } catch (error) {
              return false;
            }
          }
          return true;
        },
      ),
  });
};
export default userProfileUpdateSchema;
