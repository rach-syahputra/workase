import { DeleteAssessmentRequest } from '../../interfaces/assessment.interface';
import { prisma } from '../../helpers/prisma';

class DeleteAssessmentRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  deleteAssessment = async (req: DeleteAssessmentRequest) => {
    return await this.prisma.$transaction(async (trx) => {
      const deletedAssessment = await trx.assessment.update({
        where: {
          id: req.assessmentId,
        },
        data: {
          isDeleted: true,
        },
      });

      // Delete assessment questions related to the deleted assessment
      await trx.assessmentQuestion.updateMany({
        where: {
          assessmentId: req.assessmentId,
        },
        data: {
          isDeleted: true,
        },
      });

      return {
        deletedAssessment,
      };
    });
  };
}

export default DeleteAssessmentRepository;
