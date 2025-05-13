export interface IGetCompany {
  name: string;
  location: string;
  sort: 'asc' | 'desc';
  page: number;
}
export interface IAllCompaniesProps {
  _count: { Job: number };
  location: string;
  category: string;
  logoUrl: string;
  name: string;
  slug: string;
}

export interface Pagination {
  currentPage: number;
  totalPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalItem: number;
}

export interface CompaniesResponse {
  sortedCompanies: IAllCompaniesProps[];
  pagination: Pagination;
}
