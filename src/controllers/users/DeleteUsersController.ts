import { Response } from 'express'
import { Controller, Delete, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Controller('/users')
export class DeleteUsersController {
  constructor(private usersRepository: UsersRepository) {}

  @Delete('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.usersRepository.delete(id)
      return response.status(204).send()
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
