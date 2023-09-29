import { Injectable } from '@nestjs/common'

import { UpdateUserRoleDTO } from '@dtos/users'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Injectable()
export class UpdateUsersRoleService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: UpdateUserRoleDTO): Promise<void> {
    await this.usersRepository.updateRole(id, data)
  }
}
