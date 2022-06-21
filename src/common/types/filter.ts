/* eslint-disable no-param-reassign */
export interface CommonGetFilter {
  page: number;
  onPage: number;
  sortBy: string;
  sort: 'desc' | 'asc';
}

export type PartialCommonGetFilter = Partial<CommonGetFilter>;
