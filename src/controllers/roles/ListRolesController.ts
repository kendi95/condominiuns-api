import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { ListRolesService } from '@services/roles'

@Controller('/roles')
export class ListRolesController {
  constructor(private service: ListRolesService) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const roles = await this.service.execute({
      page: query.page,
      perPage: query.limit,
    })
    return roles
  }
}
