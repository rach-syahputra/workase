import { prisma } from '@/helpers/prisma';
import {
  AddUserAssessmentRequest,
  CalculateAssessmentResultRequest,
  UpdateUserAssessmentRequest,
} from '@/interfaces/user-assessment.interface';

class UserAssessmentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  addUserAssessment = async (req: AddUserAssessmentRequest) => {
    const userAssessment = await this.prisma.userAssessment.create({
      data: {
        userId: req.userId,
        assessmentId: req.assessmentId,
        score: req.score,
        status: req.status ? req.status : req.score > 75 ? 'PASSED' : 'FAILED',
        createdAt: new Date(),
      },
    });

    return {
      userAssessment,
    };
  };

  calculateAssessmentResult = async (req: CalculateAssessmentResultRequest) => {
    const userAssessment = await this.prisma.userAssessment.findUnique({
      where: {
        id: req.userAssessmentId,
      },
    });

    const questionOptions = (
      await Promise.all(
        req.assessmentAnswers.map((answer) =>
          this.prisma.questionOption.findUnique({
            where: {
              assessmentQuestionId: answer.assessmentQuestionId,
              id: answer.selectedOptionId,
              isCorrect: true,
            },
          }),
        ),
      )
    ).filter((option) => option !== null);

    const score = questionOptions.length * 4;

    return {
      assessmentResult: {
        userAssessmentId: userAssessment?.id,
        userId: userAssessment?.userId,
        status: score > 75 ? 'PASSED' : 'FAILED',
        score,
      },
    };
  };

  updateUserAssessment = async (req: UpdateUserAssessmentRequest) => {
    const userAssessment = await this.prisma.userAssessment.update({
      where: {
        id: req.userAssessmentId,
      },
      data: {
        score: req.score,
        status: req.status,
      },
    });

    return {
      userAssessment,
    };
  };
}

export default UserAssessmentRepository;
