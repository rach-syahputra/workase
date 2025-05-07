import { prisma } from '../../helpers/prisma';
import {
  GetAssessmentBySlugRequest,
  IsAssessmentTakenRequest,
} from '../../interfaces/assessment.interface';

class GetAssessmentDetailRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  isAssessmentPassed = async (req: IsAssessmentTakenRequest) => {
    const assessment = await this.prisma.userAssessment.findFirst({
      where: {
        userId: req.userId,
        assessment: {
          slug: req.assessmentSlug,
        },
        score: {
          gt: 85,
        },
      },
    });

    return !!assessment;
  };

  getAssessmentBySlug = async (req: GetAssessmentBySlugRequest) => {
    const assessment = await this.prisma.assessment.findUnique({
      where: {
        slug: req.slug,
      },
      include: {
        AssessmentQuestion: {
          include: {
            QuestionOption: true,
          },
        },
        UserAssessment: true,
        skill: true,
      },
    });

    const isAssessmentPassed = await this.isAssessmentPassed({
      userId: req.userId,
      assessmentSlug: req.slug,
    });

    if (assessment) {
      return {
        assessment: {
          id: assessment?.id,
          skill: {
            id: assessment.skill.id,
            title: assessment.skill.title,
          },
          image: assessment.image,
          slug: assessment.slug,
          shortDescription: assessment.shortDescription,
          createdAt: assessment?.createdAt,
          updatedAt: assessment?.updatedAt,
          isDeleted: assessment?.isDeleted,
          questions: assessment.AssessmentQuestion.map((question) => ({
            id: question.id,
            assessmentId: question.assessmentId,
            question: question.question,
            image: question.image,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
            isDeleted: question.isDeleted,
            options: question.QuestionOption,
          })),
          hasPassed: isAssessmentPassed,
          totalQuestions: assessment.AssessmentQuestion.length,
          totalEnrollmentCount: assessment.UserAssessment.length,
        },
      };
    }
  };
}

export default GetAssessmentDetailRepository;
