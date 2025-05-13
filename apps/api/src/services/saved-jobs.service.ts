import { UserRequest } from '../interfaces/middleware.interface';
import savedJobsRepository from '../repositories/saved-jobs/saved-jobs.repository';

class savedJobsService {
  async saveJob(req: UserRequest) {
    const result = await savedJobsRepository.saveJob(req);
    return result;
  }
  async unsaveJob(req: UserRequest) {
    const result = await savedJobsRepository.unsaveJob(req);
    return result;
  }
  async getSavedJobs(req: UserRequest) {
    const result = await savedJobsRepository.getSavedJobs(req);
    return result;
  }
}
export default new savedJobsService();
