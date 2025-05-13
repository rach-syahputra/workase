import getJobsRepository from '../repositories/jobs/get-jobs.repository';

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
