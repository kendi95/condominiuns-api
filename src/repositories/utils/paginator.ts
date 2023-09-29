export interface PaginatedResult<T> {
  data: T[]
  meta: {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
  }
}

export type PaginateOptions = {
  page?: number | string
  perPage?: number | string
}

export type PaginationOptions = {
  model: any
  args?: any
  options?: PaginateOptions
}

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>

export async function paginator<T>({
  options,
  model,
}: PaginationOptions): Promise<PaginatedResult<T>> {
  const page = Number(options?.page) || 1
  const perPage = Number(options?.perPage) || 10

  const skip = page > 0 ? perPage * (page - 1) : 0
  const [total, data] = await Promise.all([
    model.length,
    model.slice(skip, perPage),
  ])
  const lastPage = Math.ceil(total / perPage)

  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    },
  }
}
