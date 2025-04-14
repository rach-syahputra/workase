import { ResponseError } from '@/helpers/error';
import { putAccessToken } from '@/helpers/jwt';
import { getUserByEmail } from '@/helpers/user.prisma';

class LoginUsersRepository {
  async login(data: { email: string; password: string; authProvider: string }) {
    const user = await getUserByEmail(data.email);
    if (!user) {
      throw new ResponseError(404, 'User not found');
    }
    return await putAccessToken({
      id: user.id,
      email: user.email,
      jobId: user.jobId ?? '',
      role: 'USER',
    });
  }
}
export default new LoginUsersRepository();
