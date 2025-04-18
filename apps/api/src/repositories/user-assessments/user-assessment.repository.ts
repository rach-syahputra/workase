import { prisma } from '@/helpers/prisma';
import {
  AddUserAssessmentRequest,
  CalculateAssessmentResultRequest,
  GetUserAssessmentRequest,
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
        assessmentId: req.assessment.id,
        score: req.score,
        status: req.status ? req.status : req.score > 75 ? 'PASSED' : 'FAILED',
        createdAt: new Date(),
      },
      include: {
        assessment: {
          include: {
            skill: true,
          },
        },
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

  getUserAssessments = async (req: GetUserAssessmentRequest) => {
    const limit = req.limit ? req.limit : 8;
    const page = req.page ? req.page : 1;
    const skipConfig = (page - 1) * limit;
    const orderConfig = {
      createdAt: req.order ? req.order : 'desc',
    };

    const [totalUserAssessments, userAssessments] =
      await this.prisma.$transaction([
        this.prisma.userAssessment.count({
          where: {
            isDeleted: false,
            assessment: {
              skill: {
                title: {
                  contains: req.skill,
                  mode: 'insensitive',
                },
              },
            },
            userId: req.userId,
          },
        }),
        this.prisma.userAssessment.findMany({
          where: {
            isDeleted: false,
            assessment: {
              skill: {
                title: {
                  contains: req.skill,
                  mode: 'insensitive',
                },
              },
            },
            userId: req.userId,
          },
          include: {
            assessment: {
              include: {
                skill: true,
              },
            },
            Certificate: true,
          },
          orderBy: orderConfig,
          take: limit,
          skip: skipConfig,
        }),
      ]);

    return {
      userAssessments: userAssessments.map((userAssessment) => ({
        id: userAssessment.id,
        assessmentId: userAssessment.assessmentId,
        userId: userAssessment.userId,
        score: userAssessment.score,
        status: userAssessment.status,
        createdAt: userAssessment.createdAt,
        isDeleted: userAssessment.isDeleted,
        skill: {
          id: userAssessment.assessment.skill.id,
          title: userAssessment.assessment.skill.title,
        },
        certificate: userAssessment.Certificate,
      })),
      pagination: {
        totalData: totalUserAssessments,
        totalPages: Math.ceil(totalUserAssessments / limit),
        page,
      },
    };
  };
}

export default UserAssessmentRepository;
