import SkillRepository from '../repositories/skills/skill.repository';
import {
  AddSkillRequest,
  GetSkillsRequest,
  RemoveSkillRequest,
} from '../interfaces/skill.interface';
import { addSkillSchema } from '../validations/skill.validation';
import { validate } from '../helpers/validation';

class SkillService {
  private skillRepository: SkillRepository;

  constructor() {
    this.skillRepository = new SkillRepository();
  }

  getSkills = async (req: GetSkillsRequest) => {
    return await this.skillRepository.getSkills(req);
  };

  addSkill = async (req: AddSkillRequest) => {
    validate(addSkillSchema, req);
    return await this.skillRepository.addSkill(req);
  };

  removeSkill = async (req: RemoveSkillRequest) => {
    return await this.skillRepository.removeSkill(req);
  };
}

export default SkillService;
