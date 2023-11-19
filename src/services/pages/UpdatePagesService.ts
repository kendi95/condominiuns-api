import { Injectable } from '@nestjs/common'

import { UpdatePageDTO } from '@dtos/pages'
import { PagesRepository } from '@repositories/pages/PagesRepository'

@Injectable()
export class UpdatePagesService {
  constructor(private pagesRepository: PagesRepository) {}

  async execute(id: number, data: UpdatePageDTO): Promise<void> {
    await this.pagesRepository.update(id, data)
  }
}
