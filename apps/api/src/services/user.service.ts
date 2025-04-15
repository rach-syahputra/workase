import { ResponseError } from '@/helpers/error';
import { getUserByEmail } from '@/helpers/user.prisma';
import { UserLogin } from '@/interfaces/user.interface';
import LoginUsersRepository from '@/repositories/users/login.repository';
import RegisterUsersRepository from '@/repositories/users/register.repository';
import { Request } from 'express';
class UsersService {
  async register(data: {
    email: string;
    password: string;
    authProvider: string;
  }) {
    await RegisterUsersRepository.register(data);
  }
  async login(data: { email: string; password: string; authProvider: string }) {
    await LoginUsersRepository.login(data);
  }
}
export default new UsersService();
