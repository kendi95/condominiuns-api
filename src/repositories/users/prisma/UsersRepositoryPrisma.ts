import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

import { Users } from '@domains/Users'
import {
  CreateUserDTO,
  UpdateUserDTO,
  UpdateUserPasswordDTO,
  UpdateUserRoleDTO,
} from '@dtos/users'
import { UsersRepository } from '../UsersRepository'
import { PrismaService } from '@database/prisma'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@database/prisma/paginator'
import { AppException } from '@errors/AppException'

@Injectable()
export class UsersRepositoryPrisma implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<Omit<Users, 'password'>> {
    const userExistsByEmail = await this.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    })

    if (userExistsByEmail)
      throw new AppException('Existe usuário com esse email.', 400)

    const passwordHashed = await hash(data.password, 10)

    const createdUser = await this.prisma.users.create({
      data: {
        ...data,
        password: passwordHashed,
      },
    })

    delete createdUser.password

    return createdUser
  }

  async list(
    query: PaginateOptions,
  ): Promise<PaginatedResult<Omit<Users, 'password' | 'role'>>> {
    return paginator({
      model: this.prisma.users,
      args: {
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          id_role: true,
        },
      },
      options: {
        ...query,
      },
    })
  }

  async get(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: { role: true },
    })

    if (!user) throw new AppException('Usuário não encontrado.', 404)

    delete user.password

    return user
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    })

    if (!user) throw new AppException('Usuário não encontrado.', 404)

    await this.prisma.users.update({
      where: { id },
      data: {
        ...data,
      },
    })
  }

  async updatePassword(id: string, data: UpdateUserPasswordDTO): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    })

    if (!user) throw new AppException('Usuário não encontrado.', 404)

    const isCompared = await compare(data.current_password, user.password)

    if (!isCompared) throw new AppException('Senha atual não confere.', 404)

    if (data.new_password !== data.confirm_password) {
      throw new AppException(
        'Nova senha não confere com a senha confirmada.',
        404,
      )
    }

    const passwordHashed = await hash(data.new_password, 10)

    await this.prisma.users.update({
      where: { id },
      data: {
        password: passwordHashed,
      },
    })
  }

  async updateRole(id: string, data: UpdateUserRoleDTO): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    })

    if (!user) throw new AppException('Usuário não encontrado.', 404)

    await this.prisma.users.update({
      where: { id },
      data: { id_role: data.id_role },
    })
  }

  async updateStatus(id: string): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    })

    if (!user) throw new AppException('Usuário não encontrado.', 404)

    await this.prisma.users.update({
      where: { id },
      data: { status: !user.status },
    })
  }

  async delete(id: string): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    })

    if (!user) throw new AppException('Usuário não encontrado.', 404)

    await this.prisma.users.delete({
      where: { id },
    })
  }
}
