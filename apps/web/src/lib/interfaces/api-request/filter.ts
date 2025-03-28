export type OrderType = 'asc' | 'desc';

export interface IFilter {
  q?: string;
  order?: OrderType;
  limit?: number;
  cursor?: string;
}
