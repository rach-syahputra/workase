import { ISkill } from '../skill';
import { APIResponse, IPagination } from './response';

export interface GetSKillsData {
  skills: ISkill[];
  pagination: IPagination;
}

export interface GetSkillsResponse extends APIResponse {
  data?: GetSKillsData;
}
