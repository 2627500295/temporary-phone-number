export interface PaginationVO<T> {
  pageSize: number;
  pageNumber: number;
  total: number;
  items: T[];
}
