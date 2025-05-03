import { prisma } from '../../helpers/prisma';
import { generateRandomString, generateSlug } from '../../helpers/utils';
import { AddAssessmentRepositoryRequest } from '../../interfaces/assessment.interface';

class AddAssessmentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  addAssessment = async (req: AddAssessmentRepositoryRequest) => {
    const skill = await this.prisma.skill.findUnique({
      where: {
        id: req.skillId,
      },
    });

    let slug = generateSlug(skill?.title || '');

    const existingAssessment = await this.prisma.assessment.findFirst({
      where: {
        slug,
      },
    });

    if (existingAssessment?.slug === slug) {
      const randomString = generateRandomString(4);
      slug += `-${randomString}`;
    }

    const assessment = await this.prisma.assessment.create({
      data: {
        slug,
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
