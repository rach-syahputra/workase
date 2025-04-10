import { prisma } from '@/helpers/prisma';
import { AddAssessmentRepositoryRequest } from '@/interfaces/assessment.interface';

class AddAssessmentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  addAssessment = async (req: AddAssessmentRepositoryRequest) => {
    const assessment = await this.prisma.assessment.create({
      data: {
        skillId: req.skillId,
        image: req.image,
        shortDescription: req.shortDescription,
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
        image: assessment.image,
        shortDescription: assessment.shortDescription,
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        isDeleted: assessment.isDeleted,
      },
    };
  };
}

export default AddAssessmentRepository;
