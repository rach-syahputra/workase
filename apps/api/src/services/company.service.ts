import loginCompaniesRepository from '@/repositories/companies/login.repository';
import registerCompaniesRepository from '@/repositories/companies/register.repository';
import { Request } from 'express';
class CompaniesService {
  async register(req: Request) {
    await registerCompaniesRepository.register(req);
  }
  async login(req: Request) {
    await loginCompaniesRepository.login(req);
  }
}
export default new CompaniesService();
