import { generateHashedPassword } from '../../helpers/utils';
import { CompanyRequest } from '../../interfaces/middleware.interface';
import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

class resetCompanyPasswordRepository {
  async resetPassword(req: CompanyRequest) {
    const { password } = req.body;
    const id = req.user?.id;
    const data: Prisma.CompanyUpdateInput = {};
    if (password) data.password = await generateHashedPassword(password);
    await prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }
}
export default new resetCompanyPasswordRepository();
