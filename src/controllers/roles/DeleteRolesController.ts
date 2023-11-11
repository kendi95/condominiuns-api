import { Response } from 'express'
import { Controller, Delete, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { RolesRepository } from '@repositories/roles/RolesRepository'

@Controller('/roles')
export class DeleteRolesController {
  constructor(private rolesRepository: RolesRepository) {}

  @Delete('/:id')
  async handler(@Param('id') id: number, @Res() response: Response) {
    try {
      await this.rolesRepository.delete(id)
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
