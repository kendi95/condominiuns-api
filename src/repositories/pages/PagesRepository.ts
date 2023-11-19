import { Pages } from '@domains/Pages'
import { CreatePageDTO, UpdatePageDTO } from '@dtos/pages'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

export abstract class PagesRepository {
  abstract create(data: CreatePageDTO): Promise<Pages>
  abstract list(query: PaginateOptions): Promise<PaginatedResult<Pages>>
  abstract get(id: number): Promise<Pages>
  abstract update(id: number, data: UpdatePageDTO): Promise<void>
  abstract delete(id: number): Promise<void>
}
