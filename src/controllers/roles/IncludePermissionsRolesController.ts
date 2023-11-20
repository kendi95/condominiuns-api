import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { IncludePermissionsDTO } from '@dtos/roles'
import { AppException } from '@errors/AppException'
import { IncludePermissionsRolesService } from '@services/roles'

@Controller('/roles')
export class IncludePermissionsRolesController {
  constructor(private service: IncludePermissionsRolesService) {}

  @Put('/:id/permissions')
  async handler(
    @Param('id') id: number,
    @Body() data: IncludePermissionsDTO,
    @Res() response: Response,
  ) {
    try {
      const included = await this.service.execute(Number(id), data)
      return response.json(included)
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
