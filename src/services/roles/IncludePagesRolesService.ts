import { Injectable } from '@nestjs/common'

import { Roles } from '@domains/Roles'
import { IncludePagesDTO } from '@dtos/roles'
import { RolesRepository } from '@repositories/roles/RolesRepository'

@Injectable()
export class IncludePagesRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(id: number, data: IncludePagesDTO): Promise<Roles> {
    const included = await this.rolesRepository.includePages(id, data)
    return included
  }
}
