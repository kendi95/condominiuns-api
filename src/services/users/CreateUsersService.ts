import { Injectable } from '@nestjs/common'

import { Users } from '@domains/Users'
import { CreateUserDTO } from '@dtos/users'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Injectable()
export class CreateUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserDTO): Promise<Omit<Users, 'password'>> {
    const created = await this.usersRepository.create(data)
    return created
  }
}
