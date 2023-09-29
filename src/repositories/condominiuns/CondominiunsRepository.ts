import { Condominiuns } from '@domains/Condominiuns'
import {
  CreateCondominiumDTO,
  UpdateCondominiumAddressDTO,
  UpdateCondominiumDTO,
} from '@dtos/condominiuns'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

export abstract class CondominiunsRepository {
  abstract create(data: CreateCondominiumDTO): Promise<Condominiuns>
  abstract list(
    query: PaginateOptions,
  ): Promise<PaginatedResult<Omit<Condominiuns, 'address'>>>

  abstract get(id: string): Promise<Condominiuns>
  abstract update(id: string, data: UpdateCondominiumDTO): Promise<void>

  abstract updateStatus(id: string): Promise<void>
  abstract updateAddress(
    id: string,
    data: UpdateCondominiumAddressDTO,
  ): Promise<void>

  abstract delete(id: string): Promise<void>
}
