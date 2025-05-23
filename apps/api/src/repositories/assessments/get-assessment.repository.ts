import { getAssessmentsOrderConfig } from '../../helpers/assessments/assessment.util';
import { prisma } from '../../helpers/prisma';
import {
  GetAssessmentDiscoveryRequest,
  GetAssessmentsRequest,
} from '../../interfaces/assessment.interface';

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
        totalQuestions: assessment.AssessmentQuestion.filter(
          (question) => question.isDeleted === false,
        ).length,
        totalEnrollmentCount: assessment.UserAssessment.length,
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

    // Order by assessment enrollment count
    const orderConfig = {
      UserAssessment: {
        _count: req.order ? req.order : 'desc',
      },
    };

    const assessments = await this.prisma.assessment.findMany({
      where: {
        isDeleted: false,
        skill: {
          title: {
            contains: req.skill,
            mode: 'insensitive',
          },
        },
        UserAssessment: {
          none: {
            userId: req.userId,
            score: {
              gte: 75,
            },
          },
        },
      },
      include: {
        skill: true,
        AssessmentQuestion: true,
        UserAssessment: true,
      },
      orderBy: orderConfig,
    });

    // ACTUAL: Retrieve assessment with at least 25 questions
    // TEMPORARY: Retrieve assessment with questions less than 25 for presentation purpose
    const filteredAssessments = assessments.filter(
      (assessment) => assessment.AssessmentQuestion.length >= 5,
    );
    const totalAssessments = filteredAssessments.length || 0;
    const paginatedAssessments = filteredAssessments.slice(
      (page - 1) * limit,
      page * limit,
    );

    return {
      assessments: paginatedAssessments.map((assessment) => ({
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
        totalEnrollmentCount: assessment.UserAssessment.length,
      })),
      pagination: {
        totalData: totalAssessments,
        totalPages: Math.ceil(totalAssessments / limit),
        page,
      },
    };
  };

  getTopAssessments = async () => {
    const assessments = await this.prisma.assessment.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        UserAssessment: {
          _count: 'desc',
        },
      },
      include: {
        skill: true,
        UserAssessment: true,
      },
      take: 15,
    });

    return {
      topAssessments: assessments.map((assessment) => ({
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
        totalEnrollmentCount: assessment.UserAssessment.length,
      })),
    };
  };
}

export default GetAssessmentRepository;
