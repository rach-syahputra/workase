import { generateUserAssessmentAccessToken } from '../helpers/jwt';
import { validate } from '../helpers/validation';
import {
  AddUserAssessmentRequest,
  CalculateAssessmentResultRequest,
  GetUserAssessmentRequest,
} from '../interfaces/user-assessment.interface';
import UserAssessmentRepository from '../repositories/user-assessments/user-assessment.repository';
import { CalculateAssessmentResultSchema } from '../validations/user-assessment.validation';
import { UserAssessmentStatus } from '@prisma/client';

class UserAssessmentService {
  private userAssessmentRepository: UserAssessmentRepository;

  constructor() {
    this.userAssessmentRepository = new UserAssessmentRepository();
  }

  addUserAssessment = async (req: AddUserAssessmentRequest) => {
    const { userAssessment } =
      await this.userAssessmentRepository.addUserAssessment(req);

    if (userAssessment) {
      const token = await generateUserAssessmentAccessToken({
        assessment: {
          id: userAssessment.assessmentId,
          slug: userAssessment.assessment.slug,
          date: userAssessment.createdAt.toISOString(),
          skillTitle: userAssessment.assessment.skill.title,
        },
        userId: req.userId,
        userAssessmentId: userAssessment.id,
        startTime: new Date().toISOString(),
      });

      // Insert token to user assessment data
      await this.userAssessmentRepository.updateUserAssessment({
        userAssessmentId: userAssessment.id,
        sessionToken: token || '',
      });

      return {
        userAssessment: {
          ...userAssessment,
          token,
        },
      };
    }
  };

  calculateAssessmentResult = async (req: CalculateAssessmentResultRequest) => {
    validate(CalculateAssessmentResultSchema, req);

    const { assessmentResult } =
      await this.userAssessmentRepository.calculateAssessmentResult(req);

    if (assessmentResult) {
      const { userAssessment } =
        await this.userAssessmentRepository.updateUserAssessment({
          userAssessmentId: assessmentResult.userAssessmentId || '',
          score: assessmentResult.score,
          status: assessmentResult.status as UserAssessmentStatus,
        });

      return {
        userAssessment,
      };
    }
  };

  getUserAssessments = async (req: GetUserAssessmentRequest) => {
    await this.userAssessmentRepository.checkExpiredUserAssessment();
    return await this.userAssessmentRepository.getUserAssessments(req);
  };
}

export default UserAssessmentService;
