import { Response } from 'express'
import { Controller, Get, Param, Res } from '@nestjs/common'

import { GetRolesService } from '@services/roles'
import { AppException } from '@errors/AppException'

@Controller('/roles')
export class GetRolesController {
  constructor(private service: GetRolesService) {}

  @Get('/:id')
  async handler(@Param('id') id: number, @Res() response: Response) {
    try {
      const role = await this.service.execute(id)
      return response.json(role)
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
