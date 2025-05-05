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
        slug: req.slug,
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
