import { generateUserAssessmentAccessToken } from '@/helpers/jwt';
import { validate } from '@/helpers/validation';
import {
  AddUserAssessmentRequest,
  CalculateAssessmentResultRequest,
} from '@/interfaces/user-assessment.interface';
import UserAssessmentRepository from '@/repositories/user-assessments/user-assessment.repository';
import { CalculateAssessmentResultSchema } from '@/validations/user-assessment.validation';
import { UserAssessmentStatus } from '@prisma/client';

class UserAssessmentService {
  private userAssessmentRepository: UserAssessmentRepository;

  constructor() {
    this.userAssessmentRepository = new UserAssessmentRepository();
  }

  addUserAssessment = async (req: AddUserAssessmentRequest) => {
    const userAssessment =
      await this.userAssessmentRepository.addUserAssessment(req);

    if (userAssessment) {
      const token = await generateUserAssessmentAccessToken({
        assessmentId: req.assessmentId,
        userId: req.userId,
        userAssessmentId: userAssessment.userAssessment.id,
        startTime: new Date().toISOString(),
      });
      return {
        userAssessment: {
          ...userAssessment.userAssessment,
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
}

export default UserAssessmentService;
