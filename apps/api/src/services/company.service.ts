import loginCompaniesRepository from '@/repositories/companies/login.repository';
import registerCompaniesRepository from '@/repositories/companies/register.repository';
import { Request } from 'express';
class CompaniesService {
  async register(data: {
    name: string;
    email: string;
    password: string;
    telp: string;
    authProvider: string;
  }) {
    await registerCompaniesRepository.register(data);
  }
  async login(req: Request) {
    await loginCompaniesRepository.login(req);
  }
}
export default new CompaniesService();
