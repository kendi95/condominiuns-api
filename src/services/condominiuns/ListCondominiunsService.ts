import { Injectable } from '@nestjs/common'

import { Condominiuns } from '@domains/Condominiuns'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

@Injectable()
export class ListCondominiunsService {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  async execute(
    query: PaginateOptions,
  ): Promise<PaginatedResult<Omit<Condominiuns, 'address'>>> {
    const condominiuns = await this.condominiunsRepository.list(query)
    return condominiuns
  }
}
