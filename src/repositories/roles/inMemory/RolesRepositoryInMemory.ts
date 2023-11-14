import { Roles } from '@domains/Roles'
import { Permissions } from '@domains/Permissions'
import { AppError } from '@errors/AppError'
import { RolesRepository } from '../RolesRepository'
import {
  CreateRoleDTO,
  UpdateRoleDTO,
  IncludePermissionsDTO,
} from '@dtos/roles'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@repositories/utils/paginator'

export class RolesRepositoryInMemory implements RolesRepository {
  roles: Roles[] = []
  permissions: Permissions[] = []

  constructor() {
    this.permissions = [
      {
        id: 1,
        name: 'ACCESS_ALL',
      },
      {
        id: 2,
        name: 'CREATE_PERMISSION',
      },
      {
        id: 3,
        name: 'DELETE_PERMISSION',
      },
    ]
  }

  async create(data: CreateRoleDTO): Promise<Roles> {
    const roleExists = this.roles.find((role) => role.name === data.name)

    if (roleExists) throw new AppError('Papel do usuário já existe.')

    const role = {
      id: this.roles.length + 1,
      ...data,
    } as Roles

    this.roles.push(role)

    return role
  }

  async list(query: PaginateOptions): Promise<PaginatedResult<Roles>> {
    return paginator({
      model: this.roles,
      options: {
        ...query,
      },
    })
  }

  async get(id: number): Promise<Roles> {
    const role = this.roles.find((role) => role.id === id)

    if (!role) throw new AppError('Papel do usuário não encontrado.')

    return role
  }

  async update(id: number, data: UpdateRoleDTO): Promise<void> {
    const roleIndex = this.roles.findIndex((role) => role.id === id)

    if (roleIndex < 0) throw new AppError('Papel do usuário não encontrado.')

    this.roles[roleIndex] = {
      ...this.roles[roleIndex],
      ...data,
    }
  }

  async delete(id: number): Promise<void> {
    const roleIndex = this.roles.findIndex((role) => role.id === id)

    if (roleIndex < 0) throw new AppError('Papel do usuário não encontrado.')

    this.roles.splice(roleIndex, 1)
  }

  async includePermissions(
    id: number,
    data: IncludePermissionsDTO,
  ): Promise<Roles> {
    const roleIndex = this.roles.findIndex((role) => role.id === id)

    if (roleIndex < 0) throw new AppError('Papel do usuário não encontrado.')

    const idPermissions = this.roles[roleIndex].permissions.map(
      (permission) => permission.id,
    )

    if (idPermissions.length !== data.permissions.length) {
      this.roles[roleIndex].permissions = []
    }

    const newPermissions = this.permissions.filter(
      (permission) => data.permissions.includes(permission.id) && permission,
    )

    this.roles[roleIndex].permissions = newPermissions

    return this.roles[roleIndex]
  }
}
