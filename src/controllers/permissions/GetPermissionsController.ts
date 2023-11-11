import { Response } from 'express'
import { Controller, Get, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Controller('/permissions')
export class GetPermissionsController {
  constructor(private permissionsRepository: PermissionsRepository) {}

  @Get('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      const permission = await this.permissionsRepository.get(Number(id))
      return response.json(permission)
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
