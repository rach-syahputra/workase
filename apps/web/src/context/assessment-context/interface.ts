import { Dispatch, SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { IAssessmentColumn } from '@/app/dev/(management)/assessments/_components/table/interface';
import { OrderType } from '@/lib/interfaces/api-request/filter';

export interface fetchGetAssessmentsQuery {
  page?: number;
  limit?: number;
  order?: OrderType;
}

export interface IAssessmentContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  order: OrderType;
  setOrder: Dispatch<SetStateAction<OrderType>>;
  searchSkill: string;
  setSearchSkill: Dispatch<SetStateAction<string>>;
  debouncedSearchSkill: string;
  setDebouncedSearchSkill: Dispatch<SetStateAction<string>>;
  columns: ColumnDef<IAssessmentColumn>[];
  setColumns: Dispatch<SetStateAction<ColumnDef<IAssessmentColumn>[]>>;
  tableData: IAssessmentColumn[];
  setTableData: Dispatch<SetStateAction<IAssessmentColumn[]>>;
  fetchGetAssessments: () => void;
}
