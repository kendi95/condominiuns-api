import { Injectable } from '@nestjs/common'

import { Permissions } from '@domains/Permissions'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Injectable()
export class GetPermissionsService {
  constructor(private permissionsRepository: PermissionsRepository) {}

  async execute(id: number): Promise<Permissions> {
    const permission = await this.permissionsRepository.get(id)
    return permission
  }
}
