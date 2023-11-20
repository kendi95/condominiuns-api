import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { ListPermissionsService } from '@services/permissions'

@Controller('/permissions')
export class ListPermissionsController {
  constructor(private service: ListPermissionsService) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const permissions = await this.service.execute({
      page: query.page,
      perPage: query.limit,
    })
    return permissions
  }
}
