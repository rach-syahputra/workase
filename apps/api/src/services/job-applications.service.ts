import { UserRequest } from '@/interfaces/middleware.interface';
import applyJobRepository from '@/repositories/job-applications/apply-job.repository';
import jobApplicationsRepository from '@/repositories/job-applications/get-job-applications.repository';

class jobAplicationsService {
  async applyJob(req: UserRequest) {
    const job = await applyJobRepository.applyJob(req);
    return job;
  }
  async getJobApplications(req: UserRequest) {
    const applications =
      await jobApplicationsRepository.getJobApplications(req);
    return applications;
  }
  async getJobApplicationById(req: UserRequest) {
    const application =
      await jobApplicationsRepository.getJobApplicationById(req);
    return application;
  }
}
export default new jobAplicationsService();
