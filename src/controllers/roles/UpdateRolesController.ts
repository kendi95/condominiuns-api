import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { UpdateRoleDTO } from '@dtos/roles'
import { AppException } from '@errors/AppException'
import { UpdateRolesService } from '@services/roles'

@Controller('/roles')
export class UpdateRolesController {
  constructor(private service: UpdateRolesService) {}

  @Put('/:id')
  async handler(
    @Param('id') id: number,
    @Body() data: UpdateRoleDTO,
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
