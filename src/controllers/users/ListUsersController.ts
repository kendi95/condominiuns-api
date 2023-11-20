import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { ListUsersService } from '@services/users'

@Controller('/users')
export class ListUsersController {
  constructor(private service: ListUsersService) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const users = await this.service.execute({
      page: query.page,
      perPage: query.limit,
    })
    return users
  }
}
