import { Injectable } from '@nestjs/common'

import { Roles } from '@domains/Roles'
import { RolesRepository } from '@repositories/roles/RolesRepository'

@Injectable()
export class GetRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(id: number): Promise<Roles> {
    const role = await this.rolesRepository.get(id)
    return role
  }
}
