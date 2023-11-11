import { describe, beforeEach, it, expect } from 'vitest'

import { AppError } from '@errors/AppError'
import { DeleteRolesService } from '../DeleteRolesService'
import { CreateRolesService } from '../CreateRolesService'
import { RolesRepositoryInMemory } from '@repositories/roles/inMemory/RolesRepositoryInMemory'

describe('DELETE ROLE SERVICE', () => {
  let rolesRepositoryInMemory: RolesRepositoryInMemory
  let deleteRoleService: DeleteRolesService
  let createRoleService: CreateRolesService

  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory()
    deleteRoleService = new DeleteRolesService(rolesRepositoryInMemory)
    createRoleService = new CreateRolesService(rolesRepositoryInMemory)
  })

  it('should be able to delete a role', async () => {
    const createdRole = await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    expect(async () => {
      await deleteRoleService.execute(createdRole.id)
    }).toBeTruthy()
  })

  it('should not be able to delete a role', async () => {
    await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    expect(async () => {
      await deleteRoleService.execute(0)
    }).rejects.toThrow(AppError)
  })
})
