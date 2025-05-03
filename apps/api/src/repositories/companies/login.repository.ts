import { getCompanyByEmail } from '../../helpers/company.prisma';
import { ResponseError } from '../../helpers/error';
import { putCompanyAccessToken, putUserAccessToken } from '../../helpers/jwt';
import { Request } from 'express';
class loginCompaniesRepository {
  async login(data: { email: string; password: string; authProvider: string }) {
    const company = await getCompanyByEmail(data.email);
    if (!company) {
      throw new ResponseError(404, 'Company not found');
    }
    return await putCompanyAccessToken(company, undefined);
  }
}
export default new loginCompaniesRepository();
