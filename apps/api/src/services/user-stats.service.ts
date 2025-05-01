import UserStatsRepository from '@/repositories/users/user-stats.repository';
import {
  GetUserDetailRequest,
  GetUserStatsRequest,
} from '@/interfaces/user.interface';

class UserStatsService {
  private userStatsRepository: UserStatsRepository;

  constructor() {
    this.userStatsRepository = new UserStatsRepository();
  }

  getUserStats = async (req: GetUserStatsRequest) => {
    return await this.userStatsRepository.getUserStats(req);
  };

  getUserDetail = async (req: GetUserDetailRequest) => {
    return await this.userStatsRepository.getUserDetail(req);
  };
}

export default UserStatsService;
