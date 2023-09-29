import { Injectable } from '@nestjs/common'

import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Injectable()
export class DeleteCondominiunsService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(id: string): Promise<void> {
    await this.condominiunsRepository.delete(id)
  }
}
