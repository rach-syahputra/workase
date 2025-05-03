import { IFilter } from './filter.interface';

export interface GetSkillsRequest extends IFilter {
  title?: string;
}

export interface AddSkillRequest {
  title: string;
}
