import { Response } from 'express'
import { Controller, Get, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Controller('/users')
export class GetUsersController {
  constructor(private usersRepository: UsersRepository) {}

  @Get('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      const user = await this.usersRepository.get(id)
      return response.json(user)
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
