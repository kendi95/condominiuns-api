import { Injectable } from '@nestjs/common'

import { UpdateCondominiumAddressDTO } from '@dtos/condominiuns'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Injectable()
export class UpdateCondominiunsAddressService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(id: string, data: UpdateCondominiumAddressDTO): Promise<void> {
    await this.condominiunsRepository.updateAddress(id, data)
  }
}
