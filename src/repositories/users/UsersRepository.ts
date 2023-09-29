import { Users } from '@domains/Users'
import {
  CreateUserDTO,
  UpdateUserDTO,
  UpdateUserPasswordDTO,
  UpdateUserRoleDTO,
} from '@dtos/users'

import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

export abstract class UsersRepository {
  abstract create(data: CreateUserDTO): Promise<Omit<Users, 'password'>>
  abstract list(
    query: PaginateOptions,
  ): Promise<PaginatedResult<Omit<Users, 'password' | 'role'>>>

  abstract get(id: string): Promise<Omit<Users, 'password'>>
  abstract update(id: string, data: UpdateUserDTO): Promise<void>
  abstract updatePassword(
    id: string,
    data: UpdateUserPasswordDTO,
  ): Promise<void>

  abstract updateRole(id: string, data: UpdateUserRoleDTO): Promise<void>
  abstract updateStatus(id: string): Promise<void>
  abstract delete(id: string): Promise<void>
}
