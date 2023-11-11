import { describe, beforeEach, it, expect } from 'vitest'

import { GetRolesService } from '../GetRolesService'
import { CreateRolesService } from '../CreateRolesService'
import { RolesRepositoryInMemory } from '@repositories/roles/inMemory/RolesRepositoryInMemory'
import { AppError } from '@errors/AppError'

describe('GET ROLE SERVICE', () => {
  let rolesRepositoryInMemory: RolesRepositoryInMemory
  let getRoleService: GetRolesService
  let createRoleService: CreateRolesService

  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory()
    getRoleService = new GetRolesService(rolesRepositoryInMemory)
    createRoleService = new CreateRolesService(rolesRepositoryInMemory)
  })

  it('should be able to get a role', async () => {
    const createdRole = await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    const role = await getRoleService.execute(createdRole.id)

    expect(role).toHaveProperty('id')
    expect(role.name).toEqual('ADMINISTRATOR')
  })

  it('should not be able to get a role', async () => {
    await createRoleService.execute({
      name: 'ADMINISTRATOR',
      description: "System's administrator",
    })

    expect(async () => {
      await getRoleService.execute(0)
    }).rejects.toThrow(AppError)
  })
})
