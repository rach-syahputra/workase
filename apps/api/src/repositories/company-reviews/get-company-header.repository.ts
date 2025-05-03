import { prisma } from '../../helpers/prisma';
import { GetCompanyHeaderRequest } from '../../interfaces/company-review.interface';

class GetCompanyHeaderRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getCompanyHeader = async (req: GetCompanyHeaderRequest) => {
    const company = await this.prisma.company.findUnique({
      where: {
        id: req.companyId,
      },
      select: {
        id: true,
        name: true,
        logoUrl: true,
      },
    });

    return {
      company,
    };
  };
}

export default GetCompanyHeaderRepository;
