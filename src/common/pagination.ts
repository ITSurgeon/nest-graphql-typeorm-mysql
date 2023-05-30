export interface PaginationOptions {
  limit: number;
  page: number;
}

export interface PaginationResult<T> {
  data: T[];
  totalCount: number;
  page: number;
}

export async function paginate<T>(
  repository: any,
  options: PaginationOptions,
): Promise<PaginationResult<T>> {
  const { limit, page } = options;

  const [data, totalCount] = await repository.getManyAndCount({
    take: limit,
    skip: page > 0 ? (page - 1) * limit : 0,
  });

  return {
    data,
    totalCount,
    page,
  };
}
