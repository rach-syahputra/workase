import { getCompanyByEmail } from '@/helpers/company.prisma';
import { ResponseError } from '@/helpers/error';
import { UserLogin } from '@/interfaces/user.interfase';
import { AuthProvider } from '@prisma/client';
import * as Yup from 'yup';

const checkUserExists = async (email: string) => {
  const user = (await getCompanyByEmail(email)) as UserLogin;
  if (user) {
    throw new ResponseError(409, 'User already exists');
  }
};

const authProvider = async (authProvider: string, password: string) => {
  if (authProvider === 'EMAIL' && !password) {
    throw new ResponseError(400, 'Password is required');
  }
  return true;
};

const companyRegistrationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .test('check-user-exists', 'User already exists', async (value) => {
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
      .min(8, 'Password must be at least 8 characters'),
    telp: Yup.string()
      .required('Telp is required')
      .min(8, 'Telp must be at least 8 characters')
      .max(15, 'Telp must be at most 15 characters'),
    authProvider: Yup.string()
      .required('Auth provider is required')
      .oneOf(Object.values(AuthProvider))
      .test(
        'check-auth-provider',
        'If Auth provider is Email, password is required',
        async function (value) {
          const password = this.parent.password;
          console.log('ini password', password);
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

export default companyRegistrationSchema;
