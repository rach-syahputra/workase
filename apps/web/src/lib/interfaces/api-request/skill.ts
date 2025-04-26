import { IFilter } from './filter';

export interface GetSkillRequest extends IFilter {
  title?: string;
}

export interface AddSkillRequest {
  title: string;
}
