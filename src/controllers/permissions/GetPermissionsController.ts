import { Response } from 'express'
import { Controller, Get, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { GetPermissionsService } from '@services/permissions'

@Controller('/permissions')
export class GetPermissionsController {
  constructor(private service: GetPermissionsService) {}

  @Get('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      const permission = await this.service.execute(Number(id))
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
