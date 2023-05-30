import { Repository } from 'typeorm';

export interface PaginationOffset {
  limit: number;
  page: number;
}

export interface PaginationOffsetResult<T> {
  data: T[];
  totalCount: number;
  page: number;
}

export async function paginate<T>(
  repository: Repository<T>,
  options: PaginationOffset,
): Promise<PaginationOffsetResult<T>> {
  const { limit, page } = options;

  const [data, totalCount] = await repository.findAndCount({
    take: limit,
    skip: page > 0 ? (page - 1) * limit : 0,
  });

  return {
    data,
    totalCount,
    page,
  };
}
