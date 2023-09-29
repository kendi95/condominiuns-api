import { Injectable } from '@nestjs/common'

import { Roles } from '@domains/Roles'
import { RolesRepository } from '@repositories/roles/RolesRepository'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

@Injectable()
export class ListRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(query: PaginateOptions): Promise<PaginatedResult<Roles>> {
    const roles = await this.rolesRepository.list(query)
    return roles
  }
}
