import { Injectable } from '@nestjs/common'

import { Roles } from '@domains/Roles'
import { CreateRoleDTO } from '@dtos/roles'
import { RolesRepository } from '@repositories/roles/RolesRepository'

@Injectable()
export class CreateRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(data: CreateRoleDTO): Promise<Roles> {
    const created = await this.rolesRepository.create(data)
    return created
  }
}
