export interface PagedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
}
