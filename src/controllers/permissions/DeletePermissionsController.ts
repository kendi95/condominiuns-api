import { Response } from 'express'
import { Controller, Delete, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Controller('/permissions')
export class DeletePermissionsController {
  constructor(private permissionsRepository: PermissionsRepository) {}

  @Delete('/:id')
  async handler(@Param('id') id: number, @Res() response: Response) {
    try {
      await this.permissionsRepository.delete(Number(id))
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
