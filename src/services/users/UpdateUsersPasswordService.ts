import { Injectable } from '@nestjs/common'

import { UpdateUserPasswordDTO } from '@dtos/users'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Injectable()
export class UpdateUsersPasswordService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: UpdateUserPasswordDTO): Promise<void> {
    await this.usersRepository.updatePassword(id, data)
  }
}
