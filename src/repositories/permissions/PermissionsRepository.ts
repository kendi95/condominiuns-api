import { Permissions } from '@domains/Permissions'
import { CreatePermissionDTO, UpdatePermissionDTO } from '@dtos/permissions'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

export abstract class PermissionsRepository {
  abstract create(data: CreatePermissionDTO): Promise<Permissions>
  abstract list(query: PaginateOptions): Promise<PaginatedResult<Permissions>>
  abstract get(id: number): Promise<Permissions>
  abstract update(id: number, data: UpdatePermissionDTO): Promise<void>
  abstract delete(id: number): Promise<void>
}
