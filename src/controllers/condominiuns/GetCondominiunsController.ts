import { Response } from 'express'
import { Controller, Get, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { GetCondominiunsService } from '@services/condominiuns'

@Controller('/condominiuns')
export class GetCondominiunsController {
  constructor(private service: GetCondominiunsService) {}

  @Get('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      const condominium = await this.service.execute(id)
      return response.json(condominium)
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
