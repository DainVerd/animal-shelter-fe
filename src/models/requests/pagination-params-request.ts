export interface PaginationParamsRequest {
  pageNumber: number;
  pageSize: number; 
  sortBy?: string;
  isDescending?: boolean;
}

export default PaginationParamsRequest;