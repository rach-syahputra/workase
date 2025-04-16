import * as Yup from 'yup';
import { ResponseError } from '@/helpers/error';

import { Gender } from '@prisma/client';
import { getUserByEmail } from '@/helpers/user.prisma';
import { UserLogin } from '@/interfaces/user.interface';

const checkUserExists = async (email: string) => {
  const user = (await getUserByEmail(email)) as UserLogin;
  if (!user) {
    throw new ResponseError(404, 'User doesn`t exists');
  }
};

const userProfileUpdateSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .optional()
      .email('Invalid email format')
      .test('check-User-exists', 'User doesn`t exists', async (value) => {
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
    placeOfBirth: Yup.string().optional(),
    dateOfBirth: Yup.string().optional(),
    gender: Yup.string().optional().oneOf(Object.values(Gender)),
    lastEducation: Yup.string().optional(),
    address: Yup.string().optional(),
  });
};
export default userProfileUpdateSchema;
