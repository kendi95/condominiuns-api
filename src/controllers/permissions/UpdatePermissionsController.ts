import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { UpdatePermissionDTO } from '@dtos/permissions'
import { UpdatePermissionsService } from '@services/permissions'

@Controller('/permissions')
export class UpdatePermissionsController {
  constructor(private service: UpdatePermissionsService) {}

  @Put('/:id')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdatePermissionDTO,
    @Res() response: Response,
  ) {
    try {
      await this.service.execute(Number(id), data)
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
