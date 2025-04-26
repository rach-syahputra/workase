import UserStatsRepository from '@/repositories/users/user-stats.repository';
import { GetUserStatsRequest } from '@/interfaces/user.interface';

class UserStatsService {
  private userStatsRepository: UserStatsRepository;

  constructor() {
    this.userStatsRepository = new UserStatsRepository();
  }

  getUserStats = async (req: GetUserStatsRequest) => {
    return await this.userStatsRepository.getUserStats(req);
  };
}

export default UserStatsService;
