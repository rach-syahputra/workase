import { IFilter } from './filter';

export interface GetSkillsRequest extends IFilter {
  title?: string;
}
