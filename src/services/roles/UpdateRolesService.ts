import { Injectable } from '@nestjs/common'

import { UpdateRoleDTO } from '@dtos/roles'
import { RolesRepository } from '@repositories/roles/RolesRepository'

@Injectable()
export class UpdateRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(id: number, data: UpdateRoleDTO): Promise<void> {
    await this.rolesRepository.update(id, data)
  }
}
