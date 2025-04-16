import { CompanyRequest } from '@/interfaces/middleware.interface';
import loginCompaniesRepository from '@/repositories/companies/login.repository';
import registerCompaniesRepository from '@/repositories/companies/register.repository';
import verifiedCompanyEmailRepository from '@/repositories/companies/verified-email.repository';
import resetCompanyPasswordRepository from '@/repositories/companies/reset-password.repository';
import getCompanyProfileRepository, {
  updateCompanyProfileRepository,
  updateCompanyLogoRepository,
} from '@/repositories/companies/company-profile.repository';
class CompaniesService {
  async register(data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    authProvider: string;
  }) {
    return await registerCompaniesRepository.register(data);
  }
  async login(data: { email: string; password: string; authProvider: string }) {
    return await loginCompaniesRepository.login(data);
  }
  async verifiedEmail(req: CompanyRequest) {
    return await verifiedCompanyEmailRepository.verifiedEmail(req);
  }
  async resetPassword(req: CompanyRequest) {
    return await resetCompanyPasswordRepository.resetPassword(req);
  }
  async getCompanyProfile(req: CompanyRequest) {
    return await getCompanyProfileRepository.getCompanyProfile(req);
  }
  async updateCompanyProfile(req: CompanyRequest) {
    return await updateCompanyProfileRepository.updateCompanyProfile(req);
  }
  async updateCompanyLogo(req: CompanyRequest) {
    return await updateCompanyLogoRepository.updateCompanyLogo(req);
  }
}
export default new CompaniesService();
