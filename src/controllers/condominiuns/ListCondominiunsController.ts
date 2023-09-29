import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Controller, Get } from '@nestjs/common'

import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Controller('/condominiuns')
export class ListCondominiunsController {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  @Get('')
  async handler(@Paginate() query: PaginateQuery) {
    const condominiuns = await this.condominiunsRepository.list({
      page: query.page,
      perPage: query.limit,
    })
    return condominiuns
  }
}
