import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { UsersRepository } from '@repositories/users/UsersRepository'

@Controller('/users')
export class ListUsersController {
  constructor(private usersRepository: UsersRepository) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const users = await this.usersRepository.list({
      page: query.page,
      perPage: query.limit,
    })
    return users
  }
}
