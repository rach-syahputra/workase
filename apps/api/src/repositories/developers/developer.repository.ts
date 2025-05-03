import prisma from '../../prisma';
import { GetDeveloperByEmailRequest } from '../../interfaces/developer.interface';

class DeveloperRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getDeveloperByEmail = async (req: GetDeveloperByEmailRequest) => {
    return await this.prisma.developer.findUnique({
      where: {
        email: req.email,
      },
    });
  };
}

export default DeveloperRepository;
