import { Response } from 'express'
import { Body, Controller, Param, Patch, Res } from '@nestjs/common'

import { UpdateUserRoleDTO } from '@dtos/users'
import { AppException } from '@errors/AppException'
import { UsersRepository } from '@repositories/users/UsersRepository'

@Controller('/users')
export class UpdateUsersRoleController {
  constructor(private usersRepository: UsersRepository) {}

  @Patch('/:id/roles')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdateUserRoleDTO,
    @Res() response: Response,
  ) {
    try {
      await this.usersRepository.updateRole(id, data)
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
