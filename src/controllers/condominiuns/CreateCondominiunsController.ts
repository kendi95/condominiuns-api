import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common'

import { CreateCondominiumDTO } from '@dtos/condominiuns'
import { AppException } from '@errors/AppException'
import { CreateCondominiunsService } from '@services/condominiuns'

@Controller('/condominiuns')
export class CreateCondominiunsController {
  constructor(private service: CreateCondominiunsService) {}

  @Post('')
  async handler(@Body() data: CreateCondominiumDTO, @Res() response: Response) {
    try {
      const createdCondominium = await this.service.execute(data)
      return response.json(createdCondominium)
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
