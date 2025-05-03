import { getCompanyByEmail } from '../helpers/company.prisma';
import { ResponseError } from '../helpers/error';
import { CompanyLogin } from '../interfaces/company.interface';
import { UserLogin } from '../interfaces/user.interface';
import { AuthProvider } from '@prisma/client';
import * as Yup from 'yup';

const checkCompanyExists = async (email: string) => {
  const user = (await getCompanyByEmail(email)) as CompanyLogin;
  if (user) {
    throw new ResponseError(409, 'Company already exists');
  }
};

const authProvider = async (authProvider: string, password: string) => {
  if (authProvider === 'EMAIL' && !password) {
    throw new ResponseError(
      400,
      'Password or name or phone number is required',
    );
  }
  return true;
};

const companyRegistrationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().optional(),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .test('check-company-exists', 'Company already exists', async (value) => {
        if (value) {
          try {
            await checkCompanyExists(value);
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
    phoneNumber: Yup.string()
      .optional()
      .min(8, 'phone number must be at least 8 characters')
      .max(15, 'phone number must be at most 15 characters')
      .matches(/^\d+$/, 'Nomor telepon hanya boleh berisi angka'),
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

export default companyRegistrationSchema;
