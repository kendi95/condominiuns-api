import { Injectable } from '@nestjs/common'

import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Injectable()
export class DeletePermissionsService {
  constructor(private permissionsRepository: PermissionsRepository) {}

  async execute(id: number): Promise<void> {
    await this.permissionsRepository.delete(id)
  }
}
