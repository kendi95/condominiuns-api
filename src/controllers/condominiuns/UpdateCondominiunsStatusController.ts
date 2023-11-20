import { Response } from 'express'
import { Controller, Param, Patch, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { UpdateCondominiunsStatusService } from '@services/condominiuns'

@Controller('/condominiuns')
export class UpdateCondominiunsStatusController {
  constructor(private service: UpdateCondominiunsStatusService) {}

  @Patch('/:id/status')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.service.execute(id)
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
