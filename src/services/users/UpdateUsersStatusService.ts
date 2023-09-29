import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@repositories/users/UsersRepository'

@Injectable()
export class UpdateUsersStatusService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    await this.usersRepository.updateStatus(id)
  }
}
