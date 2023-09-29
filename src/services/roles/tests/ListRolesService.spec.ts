import { describe, beforeEach, it, expect } from 'vitest'

import { ListRolesService } from '../ListRolesService'
import { CreateRolesService } from '../CreateRolesService'
import { RolesRepositoryInMemory } from '@repositories/roles/inMemory/RolesRepositoryInMemory'

describe('LIST ROLE SERVICE', () => {
  let rolesRepositoryInMemory: RolesRepositoryInMemory
  let listRoleService: ListRolesService
  let createRoleService: CreateRolesService

  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory()
    listRoleService = new ListRolesService(rolesRepositoryInMemory)
    createRoleService = new CreateRolesService(rolesRepositoryInMemory)
  })

  it('should be able to list roles', async () => {
    await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    const { data } = await listRoleService.execute({ page: 1, perPage: 10 })

    expect(data).toHaveLength(1)
  })
})
