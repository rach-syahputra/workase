import { prisma } from '@/helpers/prisma';
import { AddAssessmentRequest } from '@/interfaces/assessment.interface';

class AddAssessmentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  addAssessment = async (req: AddAssessmentRequest) => {
    const assessment = await this.prisma.assessment.create({
      data: {
        skillId: req.skillId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        skill: true,
      },
    });

    return {
      assessment: {
        id: assessment.id,
        skill: {
          id: assessment.skill.id,
          title: assessment.skill.title,
        },
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        isDeleted: assessment.isDeleted,
      },
    };
  };
}

export default AddAssessmentRepository;
