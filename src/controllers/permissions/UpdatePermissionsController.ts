import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { UpdatePermissionDTO } from '@dtos/permissions'
import { AppException } from '@errors/AppException'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Controller('/permissions')
export class UpdatePermissionsController {
  constructor(private permissionsRepository: PermissionsRepository) {}

  @Put('/:id')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdatePermissionDTO,
    @Res() response: Response,
  ) {
    try {
      await this.permissionsRepository.update(Number(id), data)
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
