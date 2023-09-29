import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { UpdateCondominiumDTO } from '@dtos/condominiuns'
import { AppException } from '@errors/AppException'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Controller('/condominiuns')
export class UpdateCondominiunsController {
  constructor(private condominiumRepository: CondominiunsRepository) {}

  @Put('/:id')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdateCondominiumDTO,
    @Res() response: Response,
  ) {
    try {
      await this.condominiumRepository.update(id, data)
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
