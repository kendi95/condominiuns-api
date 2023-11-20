import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { UpdateUserPasswordDTO } from '@dtos/users'
import { AppException } from '@errors/AppException'
import { UpdateUsersPasswordService } from '@services/users'

@Controller('/users')
export class UpdateUsersPasswordController {
  constructor(private service: UpdateUsersPasswordService) {}

  @Put('/:id/password')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdateUserPasswordDTO,
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
