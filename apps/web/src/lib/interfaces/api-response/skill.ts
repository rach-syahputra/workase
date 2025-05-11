import { ISkill } from '../skill';
import { APIResponse, IPagination } from './response';

export interface GetSkillsResponse extends APIResponse {
  data?: {
    skills: ISkill[];
    pagination?: IPagination;
  };
}

export interface AddSkillResponse extends APIResponse {
  data?: {
    skill: ISkill;
  };
}

export interface RemoveSkillResponse extends APIResponse {
  data?: {
    removedSkill: ISkill;
  };
}
