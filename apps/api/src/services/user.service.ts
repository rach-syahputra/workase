import { ResponseError } from '@/helpers/error';
import { getUserByEmail } from '@/helpers/user.prisma';
import { UserLogin } from '@/interfaces/user.interfase';
import LoginUsersRepository from '@/repositories/users/login.repository';
import RegisterUsersRepository from '@/repositories/users/register.repository';
import { Request } from 'express';
class UsersService {
  async register(data: {
    email: string;
    password: string;
    authProvider: string;
  }) {
    const { email, password, authProvider } = data;
    const user = (await getUserByEmail(email)) as UserLogin;
    if (user) {
      throw new ResponseError(409, 'User already exists');
    } else if (!user && authProvider === 'EMAIL' && !password) {
      throw new ResponseError(400, 'Password is required');
    } else if (!user) {
      await RegisterUsersRepository.register(data);
    }
  }
  async login(req: Request) {
    await LoginUsersRepository.login(req);
  }
}
export default new UsersService();
