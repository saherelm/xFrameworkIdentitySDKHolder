export interface XPageRequestDto {
  first?: number;
  last?: number;
  after: string;
  before: string;
  sortBy: string;
  descendingSort: boolean;
}

export interface XPageResponseDto<T> {
  nodes: Array<T>;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
