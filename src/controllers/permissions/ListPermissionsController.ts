import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Controller('/permissions')
export class ListPermissionsController {
  constructor(private permissionsRepository: PermissionsRepository) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const permissions = await this.permissionsRepository.list({
      page: query.page,
      perPage: query.limit,
    })
    return permissions
  }
}
