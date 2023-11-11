import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcrypt'

import { Users } from '@domains/Users'
import {
  CreateUserDTO,
  UpdateUserDTO,
  UpdateUserPasswordDTO,
  UpdateUserRoleDTO,
} from '@dtos/users'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@repositories/utils/paginator'
import { UsersRepository } from '../UsersRepository'
import { AppError } from '@errors/AppError'
import { Roles } from '@domains/Roles'

export class UsersRepositoryInMemory implements UsersRepository {
  roles: Roles[] = []
  users: Users[] = []

  constructor() {
    this.roles = [
      {
        id: 1,
        name: 'ADMINISTRATOR',
        description: '',
      },
      {
        id: 2,
        name: 'COMMON',
        description: '',
      },
    ] as Roles[]
  }

  async create(data: CreateUserDTO): Promise<Omit<Users, 'password'>> {
    const userByEmail = this.users.find((user) => user.email === data.email)

    if (userByEmail) throw new AppError('Usuário já existe.')

    const passwordHashed = await hash(data.password, 10)

    const role = this.roles.find((role) => role.id === data.id_role)

    const createdUser = {
      id: uuidV4(),
      name: data.name,
      email: data.email,
      password: passwordHashed,
      id_role: data.id_role,
      role,
    } as Users

    this.users.push(createdUser)

    return createdUser
  }

  async list(
    query: PaginateOptions,
  ): Promise<PaginatedResult<Omit<Users, 'password' | 'role'>>> {
    return paginator({
      model: this.users,
      options: {
        ...query,
      },
    })
  }

  async get(id: string): Promise<Omit<Users, 'password'>> {
    const user = this.users.find((user) => user.id === id)

    if (!user) throw new AppError('Usuário não existe.')

    return user
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    const userExists = this.users.findIndex((user) => user.id === id)

    if (userExists === -1) throw new AppError('Usuário não existe.')

    this.users[userExists] = {
      ...this.users[userExists],
      ...data,
    }
  }

  async updatePassword(id: string, data: UpdateUserPasswordDTO): Promise<void> {
    const userExists = this.users.findIndex((user) => user.id === id)

    if (userExists === -1) throw new AppError('Usuário não existe.')

    if (this.users[userExists].password !== data.current_password) {
      throw new AppError('Senha atual não confere.')
    }

    if (data.new_password !== data.confirm_password) {
      throw new AppError('Confirmação da senha não confere com a nova senha.')
    }

    const passwordHashed = await hash(data.new_password, 10)

    this.users[userExists] = {
      ...this.users[userExists],
      password: passwordHashed,
    }
  }

  async updateRole(id: string, data: UpdateUserRoleDTO): Promise<void> {
    const userExists = this.users.findIndex((user) => user.id === id)

    if (userExists === -1) throw new AppError('Usuário não existe.')

    const role = this.roles.find((role) => role.id === data.id_role)

    this.users[userExists] = {
      ...this.users[userExists],
      ...data,
      role,
    }
  }

  async updateStatus(id: string): Promise<void> {
    const userExists = this.users.findIndex((user) => user.id === id)

    if (userExists === -1) throw new AppError('Usuário não existe.')

    this.users[userExists] = {
      ...this.users[userExists],
      status: !this.users[userExists].status,
    }
  }

  async delete(id: string): Promise<void> {
    const userExists = this.users.findIndex((user) => user.id === id)

    if (userExists === -1) throw new AppError('Usuário não existe.')

    this.users.splice(userExists, 1)
  }
}
