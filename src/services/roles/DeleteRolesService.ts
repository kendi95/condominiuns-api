import { Injectable } from '@nestjs/common'

import { RolesRepository } from '@repositories/roles/RolesRepository'

@Injectable()
export class DeleteRolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async execute(id: string): Promise<void> {
    await this.rolesRepository.delete(id)
  }
}
