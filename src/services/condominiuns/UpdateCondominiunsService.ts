import { Injectable } from '@nestjs/common'

import { UpdateCondominiumDTO } from '@dtos/condominiuns'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Injectable()
export class UpdateCondominiunsService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(id: string, data: UpdateCondominiumDTO): Promise<void> {
    await this.condominiunsRepository.update(id, data)
  }
}
