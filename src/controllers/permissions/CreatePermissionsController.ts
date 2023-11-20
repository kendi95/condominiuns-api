import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { CreatePermissionDTO } from '@dtos/permissions'
import { CreatePermissionsService } from '@services/permissions'

@Controller('/permissions')
export class CreatePermissionsController {
  constructor(private service: CreatePermissionsService) {}

  @Post('')
  async handler(@Body() data: CreatePermissionDTO, @Res() response: Response) {
    try {
      const createdPermission = await this.service.execute(data)
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
