import { Injectable } from '@nestjs/common'

import { Permissions } from '@domains/Permissions'
import { CreatePermissionDTO } from '@dtos/permissions'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Injectable()
export class CreatePermissionsService {
  constructor(private permissionsRepository: PermissionsRepository) {}

  async execute(data: CreatePermissionDTO): Promise<Permissions> {
    const created = await this.permissionsRepository.create(data)
    return created
  }
}
