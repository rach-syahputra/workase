import { getAssessmentsOrderConfig } from '@/helpers/assessments/assessment.util';
import { prisma } from '@/helpers/prisma';
import {
  AddAssessmentRequest,
  GetAssessmentByIdRequest,
  GetAssessmentsRequest,
} from '@/interfaces/assessment.interface';

class AssessmentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getAssessments = async (req: GetAssessmentsRequest) => {
    const limit = req.limit ? req.limit : 8;
    const page = req.page ? req.page : 1;
    const skipConfig = (page - 1) * limit;
    const orderConfig = getAssessmentsOrderConfig(
      req.sortBy || 'updatedAt',
      req.order || 'desc',
    );

    const [totalAssessments, assessments] = await this.prisma.$transaction([
      this.prisma.assessment.count({
        where: {
          isDeleted: false,
          skill: {
            title: {
              contains: req.skill,
              mode: 'insensitive',
            },
          },
        },
      }),
      this.prisma.assessment.findMany({
        where: {
          isDeleted: false,
          skill: {
            title: {
              contains: req.skill,
              mode: 'insensitive',
            },
          },
        },
        include: {
          skill: true,
          AssessmentQuestion: true,
        },
        orderBy: orderConfig,
        take: limit,
        skip: skipConfig,
      }),
    ]);

    return {
      assessments: assessments.map((assessment) => ({
        id: assessment.id,
        skill: {
          id: assessment.skill.id,
          title: assessment.skill.title,
        },
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        isDeleted: assessment.isDeleted,
        totalQuestions: assessment.AssessmentQuestion.length,
      })),
      pagination: {
        totalData: totalAssessments,
        totalPages: Math.ceil(totalAssessments / limit),
        page,
      },
    };
  };

  getAssessmentById = async (req: GetAssessmentByIdRequest) => {
    const assessment = await this.prisma.assessment.findUnique({
      where: {
        id: req.id,
      },
      include: {
        AssessmentQuestion: {
          include: {
            QuestionOption: true,
          },
        },
        skill: true,
      },
    });

    if (assessment) {
      return {
        assessment: {
          id: assessment?.id,
          skill: {
            id: assessment.skill.id,
            title: assessment.skill.title,
          },
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
        },
      };
    }
  };

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

export default AssessmentRepository;
