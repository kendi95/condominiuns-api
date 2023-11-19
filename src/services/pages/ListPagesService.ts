import { Injectable } from '@nestjs/common'

import { Pages } from '@domains/Pages'
import { PagesRepository } from '@repositories/pages/PagesRepository'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

@Injectable()
export class ListPagesService {
  constructor(private pagesRepository: PagesRepository) {}

  async execute(query: PaginateOptions): Promise<PaginatedResult<Pages>> {
    const pages = await this.pagesRepository.list(query)
    return pages
  }
}
