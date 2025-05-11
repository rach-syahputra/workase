import { prisma } from '../../helpers/prisma';
import { GetAvailableSkillsRequest } from '../../interfaces/assessment.interface';

class GetSkillRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getAvailableSkills = async (req: GetAvailableSkillsRequest) => {
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
          Assessment: {
            none: {
              isDeleted: false,
            },
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
          Assessment: {
            none: {
              isDeleted: false,
            },
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

export default GetSkillRepository;
