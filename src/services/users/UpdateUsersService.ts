import { Injectable } from '@nestjs/common'

import { UpdateUserDTO } from '@dtos/users'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Injectable()
export class UpdateUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<void> {
    await this.usersRepository.update(id, data)
  }
}
