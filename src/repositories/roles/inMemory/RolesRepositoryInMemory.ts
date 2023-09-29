import { v4 as uuidV4 } from 'uuid'

import { Roles } from '@domains/Roles'
import { AppError } from '@errors/AppError'
import { RolesRepository } from '../RolesRepository'
import { CreateRoleDTO, UpdateRoleDTO } from '@dtos/roles'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@repositories/utils/paginator'

export class RolesRepositoryInMemory implements RolesRepository {
  roles: Roles[] = []

  async create(data: CreateRoleDTO): Promise<Roles> {
    const roleExists = this.roles.find((role) => role.name === data.name)

    if (roleExists) throw new AppError('Papel do usuário já existe.')

    const role = {
      id: uuidV4(),
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

  async get(id: string): Promise<Roles> {
    const role = this.roles.find((role) => role.id === id)

    if (!role) throw new AppError('Papel do usuário não encontrado.')

    return role
  }

  async update(id: string, data: UpdateRoleDTO): Promise<void> {
    const roleIndex = this.roles.findIndex((role) => role.id === id)

    if (roleIndex < 0) throw new AppError('Papel do usuário não encontrado.')

    this.roles[roleIndex] = {
      ...this.roles[roleIndex],
      ...data,
    }
  }

  async delete(id: string): Promise<void> {
    const roleIndex = this.roles.findIndex((role) => role.id === id)

    if (roleIndex < 0) throw new AppError('Papel do usuário não encontrado.')

    this.roles.splice(roleIndex, 1)
  }
}
