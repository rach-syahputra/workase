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
  async login(data: { email: string; password: string; authProvider: string }) {
    await loginCompaniesRepository.login(data);
  }
}
export default new CompaniesService();
