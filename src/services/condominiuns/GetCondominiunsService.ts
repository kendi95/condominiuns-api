import { Injectable } from '@nestjs/common'

import { Condominiuns } from '@domains/Condominiuns'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Injectable()
export class GetCondominiunsService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(id: string): Promise<Condominiuns> {
    const condominium = await this.condominiunsRepository.get(id)
    return condominium
  }
}
