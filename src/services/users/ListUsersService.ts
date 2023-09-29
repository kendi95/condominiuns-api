import { Injectable } from '@nestjs/common'

import { Users } from '@domains/Users'
import { UsersRepository } from '@repositories/users/UsersRepository'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

@Injectable()
export class ListUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    query: PaginateOptions,
  ): Promise<PaginatedResult<Omit<Users, 'password' | 'role'>>> {
    const users = await this.usersRepository.list(query)
    return users
  }
}
