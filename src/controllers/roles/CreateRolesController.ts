import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common'

import { CreateRoleDTO } from '@dtos/roles'
import { AppException } from '@errors/AppException'
import { CreateRolesService } from '@services/roles'

@Controller('/roles')
export class CreateRolesController {
  constructor(private service: CreateRolesService) {}

  @Post('')
  async handler(@Body() data: CreateRoleDTO, @Res() response: Response) {
    try {
      const createdRole = await this.service.execute(data)
      return response.json(createdRole)
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
