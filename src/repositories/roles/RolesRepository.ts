import { Roles } from '@domains/Roles'
import {
  CreateRoleDTO,
  UpdateRoleDTO,
  IncludePermissionsDTO,
} from '@dtos/roles'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

export abstract class RolesRepository {
  abstract create(data: CreateRoleDTO): Promise<Roles>
  abstract list(query: PaginateOptions): Promise<PaginatedResult<Roles>>
  abstract get(id: number): Promise<Roles>
  abstract update(id: number, data: UpdateRoleDTO): Promise<void>
  abstract delete(id: number): Promise<void>

  abstract includePermissions(
    id: number,
    data: IncludePermissionsDTO,
  ): Promise<Roles>
}
