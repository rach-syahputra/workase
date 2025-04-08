import { prisma } from '@/helpers/prisma';
import { GetSkillsRequest } from '@/interfaces/skill.interface';

class SkillRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getSkills = async (req: GetSkillsRequest) => {
    const limit = req.limit ? req.limit : 5;
    const page = req.page ? req.page : 1;
    const skipConfig = (page - 1) * limit;

    const [totalSkills, skills] = await this.prisma.$transaction([
      this.prisma.skill.count({
        where: {
          isDeleted: false,
          title: {
            contains: req.title,
            mode: 'insensitive',
          },
        },
      }),
      this.prisma.skill.findMany({
        where: {
          isDeleted: false,
          title: {
            contains: req.title,
            mode: 'insensitive',
          },
        },
        take: limit,
        skip: skipConfig,
        orderBy: {
          title: 'asc',
        },
      }),
    ]);

    return {
      skills,
      pagination: {
        totalData: totalSkills,
        totalPages: Math.ceil(totalSkills / limit),
        page,
      },
    };
  };
}

export default SkillRepository;
