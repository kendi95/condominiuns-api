import { Response } from 'express'
import { Controller, Get, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { RolesRepository } from '@repositories/roles/RolesRepository'

@Controller('/roles')
export class GetRolesController {
  constructor(private rolesRepository: RolesRepository) {}

  @Get('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      const role = await this.rolesRepository.get(id)
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
