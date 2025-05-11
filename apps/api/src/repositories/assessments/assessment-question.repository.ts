import { shuffleQuestionOptions } from '../../helpers/assessments/assessment.util';
import { prisma } from '../../helpers/prisma';
import {
  AddAssessmentQuestionRepositoryRequest,
  DeleteAssessmentQuestionRequest,
  GetAssessmentQuestionByIdRequest,
  GetAssessmentQuestionsRequest,
} from '../../interfaces/assessment.interface';

class AssessmentQuestionRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getAssessmentQuestionById = async (req: GetAssessmentQuestionByIdRequest) => {
    const question = await this.prisma.assessmentQuestion.findUnique({
      where: {
        id: req.assessmentQuestionId,
      },
    });

    return {
      question,
    };
  };

  getTotalAssessmentQuestions = async (assessmentId: string) => {
    return await this.prisma.assessmentQuestion.count({
      where: {
        assessmentId,
      },
    });
  };

  getAssessmentQuestions = async (req: GetAssessmentQuestionsRequest) => {
    const limit = req.limit ? req.limit : 8;
    const page = req.page ? req.page : 1;
    const skipConfig = (page - 1) * limit;
    const orderConfig = {
      updatedAt: req.order ? req.order : 'desc',
    };

    const [totalAssessmentQuestions, assessmentQuestions] =
      await this.prisma.$transaction([
        this.prisma.assessmentQuestion.count({
          where: {
            isDeleted: false,
            assessment: {
              slug: req.slug,
            },
            question: {
              contains: req.question,
              mode: 'insensitive',
            },
          },
        }),
        this.prisma.assessmentQuestion.findMany({
          where: {
            isDeleted: false,
            assessment: {
              slug: req.slug,
            },
            question: {
              contains: req.question,
              mode: 'insensitive',
            },
          },
          include: {
            QuestionOption: true,
          },
          take: limit,
          skip: skipConfig,
          orderBy: orderConfig,
        }),
      ]);

    return {
      assessmentQuestions: assessmentQuestions.map((question) => ({
        id: question.id,
        assessmentId: question.assessmentId,
        image: question.image,
        question: question.question,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
        isDeleted: question.isDeleted,
        options: question.QuestionOption,
      })),
      pagination: {
        totalData: totalAssessmentQuestions,
        totalPages: Math.ceil(totalAssessmentQuestions / limit),
        page,
      },
    };
  };

  addAssessmentQuestion = async (
    req: AddAssessmentQuestionRepositoryRequest,
  ) => {
    return await this.prisma.$transaction(async (trx) => {
      const assessment = await trx.assessment.findFirst({
        where: {
          id: req.assessmentId,
        },
      });

      if (assessment) {
        const assessmentQuestion = await trx.assessmentQuestion.create({
          data: {
            question: req.question,
            image: req.image,
            assessmentId: assessment.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        const shuffledQuestionOptions = shuffleQuestionOptions(req.options);

        const questionOptions = await Promise.all(
          shuffledQuestionOptions.map(async (option) => {
            return await trx.questionOption.create({
              data: {
                option: option.text,
                isCorrect: option.isCorrect,
                assessmentQuestionId: assessmentQuestion.id,
                createdAt: new Date(),
              },
            });
          }),
        );

        return {
          assessmentQuestion: {
            ...assessmentQuestion,
            options: questionOptions,
          },
        };
      }
    });
  };

  deleteAssessmentQuestion = async (req: DeleteAssessmentQuestionRequest) => {
    return await this.prisma.assessmentQuestion.update({
      where: {
        id: req.assessmentQuestionId,
      },
      data: {
        isDeleted: true,
      },
    });
  };
}

export default AssessmentQuestionRepository;
