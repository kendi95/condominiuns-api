import { Injectable } from '@nestjs/common'

import { Users } from '@domains/Users'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Injectable()
export class GetUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.get(id)
    return user
  }
}
