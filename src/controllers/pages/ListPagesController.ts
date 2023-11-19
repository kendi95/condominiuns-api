import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { ListPagesService } from '@services/pages'

@Controller('/pages')
export class ListPagesController {
  constructor(private service: ListPagesService) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const pages = await this.service.execute({
      page: query.page,
      perPage: query.limit,
    })
    return pages
  }
}
