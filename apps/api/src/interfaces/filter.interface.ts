export type OrderType = 'asc' | 'desc';

export interface IFilter {
  order?: OrderType;
  page?: number;
  limit?: number;
  cursor?: string; // typically the last retrieved item's ID
}
