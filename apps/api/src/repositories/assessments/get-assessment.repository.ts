import { getAssessmentsOrderConfig } from '@/helpers/assessments/assessment.util';
import { prisma } from '@/helpers/prisma';
import {
  GetAssessmentBySlugRequest,
  GetAssessmentDiscoveryRequest,
  GetAssessmentsRequest,
} from '@/interfaces/assessment.interface';

class GetAssessmentRepository {
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
          UserAssessment: true,
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
        slug: assessment.slug,
        image: assessment.image,
        shortDescription: assessment.shortDescription,
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        isDeleted: assessment.isDeleted,
        totalQuestions: assessment.AssessmentQuestion.length,
        totalAttemptsByUser: assessment.UserAssessment.length,
      })),
      pagination: {
        totalData: totalAssessments,
        totalPages: Math.ceil(totalAssessments / limit),
        page,
      },
    };
  };

  getAssessmentDiscovery = async (req: GetAssessmentDiscoveryRequest) => {
    const limit = req.limit ? req.limit : 9;
    const page = req.page ? req.page : 1;
    const skipConfig = (page - 1) * limit;
    const orderConfig = {
      createdAt: req.order ? req.order : 'asc',
    };

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
          UserAssessment: {
            none: {},
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
          UserAssessment: {
            none: {},
          },
        },
        include: {
          skill: true,
          AssessmentQuestion: true,
          UserAssessment: true,
        },
        orderBy: orderConfig,
        take: limit,
        skip: skipConfig,
      }),
    ]);

    // Retrieve assessment with at least 25 questions
    const filteredAssessments = assessments.filter(
      (assessment) => assessment.AssessmentQuestion.length >= 25,
    );

    return {
      assessments: filteredAssessments.map((assessment) => ({
        id: assessment.id,
        skill: {
          id: assessment.skill.id,
          title: assessment.skill.title,
        },
        slug: assessment.slug,
        image: assessment.image,
        shortDescription: assessment.shortDescription,
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        isDeleted: assessment.isDeleted,
        totalQuestions: assessment.AssessmentQuestion.length,
        totalAttemptsByUser: assessment.UserAssessment.length,
      })),
      pagination: {
        totalData: totalAssessments,
        totalPages: Math.ceil(totalAssessments / limit),
        page,
      },
    };
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
          totalQuestions: assessment.AssessmentQuestion.length,
          totalAttemptsByUser: assessment.UserAssessment.length,
        },
      };
    }
  };
}

export default GetAssessmentRepository;
