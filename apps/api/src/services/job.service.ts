<<<<<<< HEAD
import GetJobsRepository from '../repositories/jobs/get-jobs.repository';
=======
import getJobsRepository from '@/repositories/jobs/get-jobs.repository';
>>>>>>> 178cd18 (feat: complete all core features for initial release)
import { Request } from 'express';

class JobsService {
  async getJobs(req: Request) {
    const jobs = await getJobsRepository.getJobs(req);
    return jobs;
  }
  async getJobBySlug(req: Request) {
    const job = await getJobsRepository.getJobBySlug(req);
    return job;
  }
}

export default new JobsService();
