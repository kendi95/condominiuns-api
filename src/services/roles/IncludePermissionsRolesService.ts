import { Injectable } from '@nestjs/common'

import { Roles } from '@domains/Roles'
import { IncludePermissionsDTO } from '@dtos/roles'
import { RolesRepository } from '@repositories/roles/RolesRepository'

@Injectable()
export class IncludePermissionsRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(id: number, data: IncludePermissionsDTO): Promise<Roles> {
    const included = await this.rolesRepository.includePermissions(id, data)
    return included
  }
}
