import GetJobsRepository from '../repositories/jobs/get-jobs.repository';
import { Request } from 'express';

class JobsService {
  async getJobs(req: Request) {
    const jobs = await GetJobsRepository.getJobs(req);
    return jobs;
  }
}

export default new JobsService();
