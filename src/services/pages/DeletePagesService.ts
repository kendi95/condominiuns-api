import { Injectable } from '@nestjs/common'

import { PagesRepository } from '@repositories/pages/PagesRepository'

@Injectable()
export class DeletePagesService {
  constructor(private pagesRepository: PagesRepository) {}

  async execute(id: number): Promise<void> {
    await this.pagesRepository.delete(id)
  }
}
