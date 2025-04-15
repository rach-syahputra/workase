import { ResponseError } from '@/helpers/error';
import { putUserAccessToken } from '@/helpers/jwt';
import { getUserByEmail } from '@/helpers/user.prisma';

class LoginUsersRepository {
  async login(data: { email: string; password: string; authProvider: string }) {
    const user = await getUserByEmail(data.email);
    if (!user) {
      throw new ResponseError(404, 'User not found');
    }
    return await putUserAccessToken(user, undefined);
  }
}
export default new LoginUsersRepository();
