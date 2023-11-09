import { Injectable } from '@nestjs/common'

import { UpdateCondominiumContactDTO } from '@dtos/condominiuns'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Injectable()
export class UpdateCondominiunsContactService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(id: string, data: UpdateCondominiumContactDTO): Promise<void> {
    await this.condominiunsRepository.updateContact(id, data)
  }
}
