import { UserRequest } from '@/interfaces/middleware.interface';

import loginUsersRepository from '@/repositories/users/login.repository';
import registerUsersRepository from '@/repositories/users/register.repository';
import verifiedUserEmailRepository from '@/repositories/users/varified-email.repository';
import resetUserPasswordRepository from '@/repositories/users/reset-password.repository';
import getUserProfileRepository, {
  updateUserPhotoProfileRepository,
  updateUserProfileRepository,
} from '@/repositories/users/user-profile.repository';
import { ResponseError } from '@/helpers/error';
import { putUserAccessToken } from '@/helpers/jwt';
class UsersService {
  async register(data: {
    email: string;
    password: string;
    authProvider: string;
  }) {
    return await registerUsersRepository.register(data);
  }
  async login(data: { email: string; password: string; authProvider: string }) {
    return await loginUsersRepository.login(data);
  }
  async verifiedEmail(req: UserRequest) {
    return await verifiedUserEmailRepository.verifiedEmail(req);
  }
  async resetPassword(req: UserRequest) {
    return await resetUserPasswordRepository.resetPassword(req);
  }
  async getUserProfile(req: UserRequest) {
    return await getUserProfileRepository.getUserProfile(req);
  }
  async updateUserProfile(req: UserRequest) {
    return await updateUserProfileRepository.updateUserProfile(req);
  }
  async updateUserPhoto(req: UserRequest) {
    return await updateUserPhotoProfileRepository.updateUserPhotoProfile(req);
  }
  async refreshToken(req: UserRequest) {
    if (!req.user?.email) throw new ResponseError(401, 'Invalid Token');
    const result = await putUserAccessToken(undefined, req.user?.email);
    return result;
  }
}
export default new UsersService();
