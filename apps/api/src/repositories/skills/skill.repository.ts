import { prisma } from '@/helpers/prisma';
import {
  AddSkillRequest,
  GetSkillsRequest,
} from '@/interfaces/skill.interface';

class SkillRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getSkills = async (req: GetSkillsRequest) => {
    const limit = req.limit ? req.limit : 8;
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
        orderBy: {
          createdAt: req.order ? req.order : 'desc',
        },
        take: limit,
        skip: skipConfig,
      }),
    ]);

    return {
      skills: skills.map((skill) => ({
        id: skill.id,
        title: skill.title,
        createdAt: skill.createdAt,
        updatedAt: skill.updatedAt,
        isDeleted: skill.isDeleted,
      })),
      pagination: {
        totalData: totalSkills,
        totalPages: Math.ceil(totalSkills / limit),
        page,
      },
    };
  };

  addSkill = async (req: AddSkillRequest) => {
    const skill = await this.prisma.skill.create({
      data: {
        title: req.title,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      skill,
    };
  };
}

export default SkillRepository;
