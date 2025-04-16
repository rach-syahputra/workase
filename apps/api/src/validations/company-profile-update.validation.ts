import * as Yup from 'yup';
import { getCompanyByEmail } from '@/helpers/company.prisma';
import { ResponseError } from '@/helpers/error';

import { CompanyLogin } from '@/interfaces/company.interface';

import { AuthProvider } from '@prisma/client';

const checkCompanyExists = async (email: string) => {
  const user = (await getCompanyByEmail(email)) as CompanyLogin;
  if (!user) {
    throw new ResponseError(404, 'Company doesn`t exists');
  }
};

const companyProfileUpdateSchema = () => {
  return Yup.object().shape({
    name: Yup.string().optional(),
    email: Yup.string()
      .optional()
      .email('Invalid email format')
      .test('check-Company-exists', 'Company doesn`t exists', async (value) => {
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
      .min(8, 'Telp must be at least 8 characters')
      .max(15, 'Telp must be at most 15 characters'),
    description: Yup.string().optional(),
    category: Yup.string().optional(),
    location: Yup.string().optional(),
  });
};
export default companyProfileUpdateSchema;
