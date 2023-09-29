import { Injectable } from '@nestjs/common'

import { Condominiuns } from '@domains/Condominiuns'
import { CreateCondominiumDTO } from '@dtos/condominiuns'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Injectable()
export class CreateCondominiunsService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(data: CreateCondominiumDTO): Promise<Condominiuns> {
    const created = await this.condominiunsRepository.create(data)
    return created
  }
}
