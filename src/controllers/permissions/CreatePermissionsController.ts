import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common'

import { CreatePermissionDTO } from '@dtos/permissions'
import { AppException } from '@errors/AppException'
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'

@Controller('/permissions')
export class CreatePermissionsController {
  constructor(private permissionsRepository: PermissionsRepository) {}

  @Post('')
  async handler(@Body() data: CreatePermissionDTO, @Res() response: Response) {
    try {
      const createdPermission = await this.permissionsRepository.create(data)
      return response.json(createdPermission)
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
