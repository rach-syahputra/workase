import { hashedPassword } from '../helpers/bcrypt';
import { ResponseError } from '../helpers/error';
import { getUserByEmail } from '../helpers/user.prisma';
import { UserLogin } from '../interfaces/user.interface';
import { AuthProvider } from '@prisma/client';
import { compare } from 'bcrypt';
import * as Yup from 'yup';
const checkUserExists = async (email: string) => {
  const user = (await getUserByEmail(email)) as UserLogin;
  if (!user) {
    throw new ResponseError(404, 'User doesn`t exists');
  }
};

const authProvider = async (authProvider: string, password: string) => {
  if (authProvider === 'EMAIL' && !password) {
    throw new ResponseError(400, 'Password is required');
  }
  return true;
};

export const userCheckPassword = async (email: string, password: string) => {
  const user = (await getUserByEmail(email)) as UserLogin;
  if (!(await compare(password, user.password as string))) {
    throw new ResponseError(401, 'Invalid password');
  }
};
export const userLoginSchema = () => {
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
    password: Yup.string()
      .optional()
      .min(8, 'Password must be at least 8 characters')
      .test('check-password', 'Invalid password', async function (value) {
        const email = this.parent.email;
        if (value) {
          try {
            await userCheckPassword(email, value);
            return true;
          } catch (error) {
            return false;
          }
        }
        return true;
      }),
    authProvider: Yup.string()
      .required('Auth provider is required')
      .oneOf(Object.values(AuthProvider))
      .test(
        'check-auth-provider',
        'If Auth provider is Email, password is required',
        async function (value) {
          const password = this.parent.password;

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
