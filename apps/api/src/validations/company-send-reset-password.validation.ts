import { getCompanyByEmail } from '@/helpers/company.prisma';
import { ResponseError } from '@/helpers/error';
import { getUserByEmail } from '@/helpers/user.prisma';
import { CompanyLogin } from '@/interfaces/company.interface';

import { UserLogin } from '@/interfaces/user.interface';

import * as Yup from 'yup';

const checkCompanyExists = async (email: string) => {
  const user = (await getCompanyByEmail(email)) as CompanyLogin;
  if (!user) {
    throw new ResponseError(404, 'Company doesn`t exists');
  }
  if (user.authProvider !== 'EMAIL') {
    throw new ResponseError(
      400,
      'The company uses a thirt-party service for registration, so the company doesn`t need reset his password',
    );
  }
};

const companySendResetPasswordSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .test(
        'check-company-exists',
        'The Company doesn`t exists',
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
  });
};

export default companySendResetPasswordSchema;
