import { CompanyRequest } from '../../interfaces/middleware.interface';
import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

class verifiedCompanyEmailRepository {
  async verifiedEmail(req: CompanyRequest) {
    const id = req.user?.id;
    const data: Prisma.CompanyUpdateInput = {};
    data.isVerified = true;
    await prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }
}
export default new verifiedCompanyEmailRepository();
