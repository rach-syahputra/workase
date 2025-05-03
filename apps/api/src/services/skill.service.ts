import SkillRepository from '../repositories/skills/skill.repository';
import {
  AddSkillRequest,
  GetSkillsRequest,
} from '../interfaces/skill.interface';

class SkillService {
  private skillRepository: SkillRepository;

  constructor() {
    this.skillRepository = new SkillRepository();
  }

  getSkills = async (req: GetSkillsRequest) => {
    return await this.skillRepository.getSkills(req);
  };

  addSkill = async (req: AddSkillRequest) => {
    return await this.skillRepository.addSkill(req);
  };
}

export default SkillService;
