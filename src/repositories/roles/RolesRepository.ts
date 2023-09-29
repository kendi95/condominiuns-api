import { Roles } from '@domains/Roles'
import { CreateRoleDTO, UpdateRoleDTO } from '@dtos/roles'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

export abstract class RolesRepository {
  abstract create(data: CreateRoleDTO): Promise<Roles>
  abstract list(query: PaginateOptions): Promise<PaginatedResult<Roles>>
  abstract get(id: string): Promise<Roles>
  abstract update(id: string, data: UpdateRoleDTO): Promise<void>
  abstract delete(id: string): Promise<void>
}
