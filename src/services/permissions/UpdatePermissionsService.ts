import { Injectable } from '@nestjs/common'

import { UpdatePermissionDTO } from '@dtos/permissions'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Injectable()
export class UpdatePermissionsService {
  constructor(private permissionsRepository: PermissionsRepository) {}

  async execute(id: number, data: UpdatePermissionDTO): Promise<void> {
    await this.permissionsRepository.update(id, data)
  }
}
