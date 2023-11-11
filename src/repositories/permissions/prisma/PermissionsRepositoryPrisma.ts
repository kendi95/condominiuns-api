import { Injectable } from '@nestjs/common'

import { PrismaService } from '@database/prisma'
import { Permissions } from '@domains/Permissions'
import { AppException } from '@errors/AppException'
import { CreatePermissionDTO, UpdatePermissionDTO } from '@dtos/permissions'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@database/prisma/paginator'
import { PermissionsRepository } from '../PermissionsRepository'

@Injectable()
export class PermissionsRepositoryPrisma implements PermissionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePermissionDTO): Promise<Permissions> {
    const permissionExists = await this.prisma.permissions.findUnique({
      where: { name: data.name },
    })

    if (permissionExists) {
      throw new AppException('Permissão já existe.', 400)
    }

    const created = await this.prisma.permissions.create({
      data: { ...data },
    })

    return created
  }

  async list(query: PaginateOptions): Promise<PaginatedResult<Permissions>> {
    return paginator({
      model: this.prisma.permissions,
      options: {
        ...query,
      },
    })
  }

  async get(id: number): Promise<Permissions> {
    const permission = await this.prisma.permissions.findUnique({
      where: { id },
    })

    if (!permission) throw new AppException('Permissão não encontrado.', 404)

    return permission
  }

  async update(id: number, data: UpdatePermissionDTO): Promise<void> {
    const permission = await this.prisma.permissions.findUnique({
      where: { id },
    })

    if (!permission) throw new AppException('Permissão não encontrado.', 404)

    await this.prisma.permissions.update({
      where: { id },
      data: { ...data },
    })
  }

  async delete(id: number): Promise<void> {
    const permission = await this.prisma.permissions.findUnique({
      where: { id },
    })

    if (!permission) throw new AppException('Permissão não encontrado.', 404)

    await this.prisma.permissions.delete({
      where: { id },
    })
  }
}
