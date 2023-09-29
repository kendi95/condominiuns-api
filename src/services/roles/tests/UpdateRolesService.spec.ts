import { describe, beforeEach, it, expect } from 'vitest'

import { UpdateRolesService } from '../UpdateRolesService'
import { CreateRolesService } from '../CreateRolesService'
import { RolesRepositoryInMemory } from '@repositories/roles/inMemory/RolesRepositoryInMemory'
import { AppError } from '@errors/AppError'

describe('GET ROLE SERVICE', () => {
  let rolesRepositoryInMemory: RolesRepositoryInMemory
  let updateRoleService: UpdateRolesService
  let createRoleService: CreateRolesService

  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory()
    updateRoleService = new UpdateRolesService(rolesRepositoryInMemory)
    createRoleService = new CreateRolesService(rolesRepositoryInMemory)
  })

  it('should be able to update a role', async () => {
    const createdRole = await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    expect(async () => {
      await updateRoleService.execute(createdRole.id, {
        name: 'ADMINISTRATOR 2',
        description: "System's administrator",
      })
    }).toBeTruthy()
  })

  it('should not be able to update a role', async () => {
    await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    expect(async () => {
      await updateRoleService.execute('wrong id', {
        name: 'ADMINISTRATOR 2',
        description: "System's administrator",
      })
    }).rejects.toThrow(AppError)
  })
})
