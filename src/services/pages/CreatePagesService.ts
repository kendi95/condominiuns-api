import { Injectable } from '@nestjs/common'

import { Pages } from '@domains/Pages'
import { CreatePageDTO } from '@dtos/pages'
import { PagesRepository } from '@repositories/pages/PagesRepository'

@Injectable()
export class CreatePagesService {
  constructor(private pagesRepository: PagesRepository) {}

  async execute(data: CreatePageDTO): Promise<Pages> {
    const created = await this.pagesRepository.create(data)
    return created
  }
}
