import { ResponseError } from '@/helpers/error';
import { getUserByEmail } from '@/helpers/user.prisma';

import { UserLogin } from '@/interfaces/user.interface';

import * as Yup from 'yup';

const checkUserExists = async (email: string) => {
  const user = (await getUserByEmail(email)) as UserLogin;
  if (!user) {
    throw new ResponseError(404, 'User doesn`t exists');
  }
  if (user.authProvider !== 'EMAIL') {
    throw new ResponseError(
      400,
      'User use thirt party to register, so user doesn`t need reset password',
    );
  }
};

const userSendResetPasswordSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .test('check-user-exists', 'User doesn`t exists', async (value) => {
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
  });
};

export default userSendResetPasswordSchema;
