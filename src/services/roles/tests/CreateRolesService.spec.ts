import { describe, beforeEach, it, expect } from 'vitest'

import { CreateRolesService } from '../CreateRolesService'
import { RolesRepositoryInMemory } from '@repositories/roles/inMemory/RolesRepositoryInMemory'
import { AppError } from '@errors/AppError'

describe('CREATE ROLE SERVICE', () => {
  let rolesRepositoryInMemory: RolesRepositoryInMemory
  let createRoleService: CreateRolesService

  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory()
    createRoleService = new CreateRolesService(rolesRepositoryInMemory)
  })

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    expect(role).toHaveProperty('id')
    expect(role.name).toEqual('ADMINISTRATOR')
  })

  it('should not be able to create a role', async () => {
    await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    expect(async () => {
      await createRoleService.execute({
        name: 'ADMINISTRATOR',
        description: "System's administrator",
      })
    }).rejects.toThrow(AppError)
  })
})
