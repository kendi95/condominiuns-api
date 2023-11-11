import { Injectable } from '@nestjs/common'

import { Permissions } from '@domains/Permissions'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'
import { PaginateOptions, PaginatedResult } from '@repositories/utils/paginator'

@Injectable()
export class ListPermissionsService {
  constructor(private permissionsRepository: PermissionsRepository) {}

  async execute(query: PaginateOptions): Promise<PaginatedResult<Permissions>> {
    const permissions = await this.permissionsRepository.list(query)
    return permissions
  }
}
