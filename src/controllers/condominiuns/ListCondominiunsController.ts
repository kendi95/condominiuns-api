import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { ListCondominiunsService } from '@services/condominiuns'

@Controller('/condominiuns')
export class ListCondominiunsController {
  constructor(private service: ListCondominiunsService) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const condominiuns = await this.service.execute({
      page: query.page,
      perPage: query.limit,
    })
    return condominiuns
  }
}
