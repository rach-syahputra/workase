import SkillRepository from '@/repositories/skills/skill.repository';
import { GetSkillsRequest } from '@/interfaces/skill.interface';

class SkillService {
  private skillRepository: SkillRepository;

  constructor() {
    this.skillRepository = new SkillRepository();
  }

  getSkills = async (req: GetSkillsRequest) => {
    return await this.skillRepository.getSkills(req);
  };
}

export default SkillService;
