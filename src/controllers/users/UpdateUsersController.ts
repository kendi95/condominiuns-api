import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { UpdateUserDTO } from '@dtos/users'
import { AppException } from '@errors/AppException'
import { UpdateUsersService } from '@services/users'

@Controller('/users')
export class UpdateUsersController {
  constructor(private service: UpdateUsersService) {}

  @Put('/:id')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
    @Res() response: Response,
  ) {
    try {
      await this.service.execute(id, data)
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
