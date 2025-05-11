import { UserRequest } from '@/interfaces/middleware.interface';
import prisma from '@/prisma';
import { $Enums } from '@prisma/client';

class applyJobRepository {
  static async applyJob(req: UserRequest) {
    const jobId = req.params.jobId;
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID is required to apply for a job.');
    }
    const cvUrl = req.body.cvUrl;
    const salaryEstimate = parseInt(req.body.salaryEstimate);
    
    await prisma.appliedJob.create({
      data: {
        jobId: jobId,
        userId: userId,
        cvUrl: cvUrl,
        salaryEstimate: salaryEstimate,
        status: $Enums.AppliedJobStatus.WAITING, // Default status value
        appliedAt: new Date(), // Current timestamp
        preselectionPassed: false, // Default value
      },
    });
  }
}
export default applyJobRepository;
