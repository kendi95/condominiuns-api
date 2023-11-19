import { Injectable } from '@nestjs/common'

import { Pages } from '@domains/Pages'
import { PagesRepository } from '@repositories/pages/PagesRepository'

@Injectable()
export class GetPagesService {
  constructor(private pagesRepository: PagesRepository) {}

  async execute(id: number): Promise<Pages> {
    const page = await this.pagesRepository.get(id)
    return page
  }
}
