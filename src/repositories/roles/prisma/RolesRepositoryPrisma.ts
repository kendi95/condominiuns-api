import { Injectable } from '@nestjs/common'

import { Roles } from '@domains/Roles'
import { CreateRoleDTO, UpdateRoleDTO } from '@dtos/roles'
import { RolesRepository } from '../RolesRepository'
import { PrismaService } from '@database/prisma'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@database/prisma/paginator'
import { AppException } from '@errors/AppException'

@Injectable()
export class RolesRepositoryPrisma implements RolesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoleDTO): Promise<Roles> {
    const roleExists = await this.prisma.roles.findFirst({
      where: {
        name: data.name,
      },
    })

    if (roleExists) throw new AppException('Papel do usuário já existe.', 400)

    const createdRole = await this.prisma.roles.create({
      data: { ...data },
    })

    return createdRole
  }

  async list(query: PaginateOptions): Promise<PaginatedResult<Roles>> {
    return paginator({
      model: this.prisma.roles,
      options: {
        ...query,
      },
    })
  }

  async get(id: string): Promise<Roles> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
    })

    if (!role) throw new AppException('Papel do usuário não encontrado.', 404)

    return role
  }

  async update(id: string, data: UpdateRoleDTO): Promise<void> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
    })

    if (!role) throw new AppException('Papel do usuário não encontrado.', 404)

    const roleExists = await this.prisma.roles.findFirst({
      where: {
        name: data.name,
        id: {
          not: {
            equals: id,
          },
        },
      },
    })

    if (roleExists) throw new AppException('Papel do usuário já existe.', 400)

    await this.prisma.roles.update({
      where: { id },
      data: {
        ...data,
      },
    })
  }

  async delete(id: string): Promise<void> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
    })

    if (!role) throw new AppException('Papel do usuário não encontrado.', 404)

    await this.prisma.roles.delete({
      where: { id },
    })
  }
}
