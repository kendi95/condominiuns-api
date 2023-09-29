import { Injectable } from '@nestjs/common'

import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Injectable()
export class UpdateCondominiunsStatusService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(id: string): Promise<void> {
    await this.condominiunsRepository.updateStatus(id)
  }
}
