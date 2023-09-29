import { Response } from 'express'
import { Controller, Param, Patch, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'

@Controller('/condominiuns')
export class UpdateCondominiunsStatusController {
  constructor(private condominiunsRepository: CondominiunsRepository) {}

  @Patch('/:id/status')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.condominiunsRepository.updateStatus(id)
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
