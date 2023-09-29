import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common'

import { CreateUserDTO } from '@dtos/users'
import { AppException } from '@errors/AppException'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Controller('/users')
export class CreateUsersController {
  constructor(private usersRepository: UsersRepository) {}

  @Post('')
  async handler(@Body() data: CreateUserDTO, @Res() response: Response) {
    try {
      const createdUser = await this.usersRepository.create(data)
      return response.json(createdUser)
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.statusCode).json(error.toJson())
      }

      return response
        .status(500)
        .json({ statusCode: 500, message: 'Internal server error!' })
    }
  }
}
