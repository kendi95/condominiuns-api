import { Injectable } from '@nestjs/common'

import { Roles } from '@domains/Roles'
import {
  CreateRoleDTO,
  IncludePagesDTO,
  IncludePermissionsDTO,
  UpdateRoleDTO,
} from '@dtos/roles'
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

  async get(id: number): Promise<Roles> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
    })

    if (!role) throw new AppException('Papel do usuário não encontrado.', 404)

    return role
  }

  async update(id: number, data: UpdateRoleDTO): Promise<void> {
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

  async delete(id: number): Promise<void> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
    })

    if (!role) throw new AppException('Papel do usuário não encontrado.', 404)

    await this.prisma.roles.delete({
      where: { id },
    })
  }

  async includePermissions(
    id: number,
    data: IncludePermissionsDTO,
  ): Promise<Roles> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    })

    if (!role) throw new AppException('Papel do usuário não encontrado.', 404)

    if (role.permissions.length > 0) {
      await this.prisma.rolesPermissions.deleteMany({
        where: { id_role: id },
      })
    }

    const datas = data.permissions.map((idPermission) => {
      return {
        id_permission: idPermission,
        id_role: id,
      }
    })

    await this.prisma.rolesPermissions.createMany({
      data: [...datas],
    })

    const includedPermissions = await this.prisma.roles.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    })

    const permissions = includedPermissions.permissions.map(
      (permission) => permission.permission,
    )

    const newRole: Roles = {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions,
    }

    return newRole
  }

  async includePages(id: number, data: IncludePagesDTO): Promise<Roles> {
    const role = await this.prisma.roles.findUnique({
      where: { id },
      include: {
        pages: true,
      },
    })

    if (!role) throw new AppException('Papel do usuário não encontrado.', 404)

    if (role.pages.length > 0) {
      await this.prisma.rolesPages.deleteMany({
        where: { id_role: id },
      })
    }

    const datas = data.pages.map((idPage) => {
      return {
        id_page: idPage,
        id_role: id,
      }
    })

    await this.prisma.rolesPages.createMany({
      data: [...datas],
    })

    const includedPermissions = await this.prisma.roles.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        pages: {
          select: {
            page: true,
          },
        },
      },
    })

    const pages = includedPermissions.pages.map((page) => page.page)

    const newRole: Roles = {
      id: role.id,
      name: role.name,
      description: role.description,
      pages,
    }

    return newRole
  }
}
