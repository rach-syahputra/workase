import * as Yup from 'yup';
import { getCompanyByEmail } from '../helpers/company.prisma';
import { ResponseError } from '../helpers/error';

import { CompanyLogin } from '../interfaces/company.interface';

import { AuthProvider } from '@prisma/client';

const checkCompanyExists = async (email: string) => {
  const user = (await getCompanyByEmail(email)) as CompanyLogin;
  if (user) {
    throw new ResponseError(404, 'Company has been exists');
  }
};

const authProvider = async (authProvider: string, password: string) => {
  if (authProvider === 'GOOGLE' && password) {
    throw new ResponseError(
      400,
      'The company uses a thirt-party service for registration, so the company doesn`t need reset his password',
    );
  }
  return true;
};

const companyProfileUpdateSchema = () => {
  return Yup.object().shape({
    name: Yup.string().optional(),
    email: Yup.string()
      .optional()
      .email('Invalid email format')
      .test(
        'check-Company-exists',
        'Company has been exists',
        async (value) => {
          if (value) {
            try {
              await checkCompanyExists(value);
              return true;
            } catch (error) {
              return false;
            }
          }
          return true;
        },
      ),
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
    phoneNumber: Yup.string()
      .optional()
      .min(8, 'Telp must be at least 8 characters')
      .max(15, 'Telp must be at most 15 characters')
      .matches(/^\d+$/, 'Nomor telepon hanya boleh berisi angka'),
    description: Yup.string().optional(),
    category: Yup.string().optional(),
    location: Yup.string().optional(),
    authProvider: Yup.string()
      .optional()
      .oneOf(Object.values(AuthProvider))
      .test(
        'check-auth-provider',
        'If Auth provider is GOOGLE, the company doesn`t need reset his password',
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
export default companyProfileUpdateSchema;
