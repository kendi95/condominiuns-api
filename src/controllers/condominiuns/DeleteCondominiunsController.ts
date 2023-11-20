import { Response } from 'express'
import { Controller, Delete, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { DeleteCondominiunsService } from '@services/condominiuns'

@Controller('/condominiuns')
export class DeleteCondominiunsController {
  constructor(private service: DeleteCondominiunsService) {}

  @Delete('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.service.execute(id)
      return response.status(204).send()
    } catch (error) {
      if (error instanceof AppException) {
        return response.status(error.statusCode).json(error.toJson())
      }

      console.log(error)

      return response
        .status(500)
        .json({ statusCode: 500, message: 'Internal server error!' })
    }
  }
}
