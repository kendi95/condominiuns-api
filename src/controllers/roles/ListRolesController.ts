import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { RolesRepository } from '@repositories/roles/RolesRepository'

@Controller('/roles')
export class ListRolesController {
  constructor(private rolesRepository: RolesRepository) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const roles = await this.rolesRepository.list({
      page: query.page,
      perPage: query.limit,
    })
    return roles
  }
}
