import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { UpdateCondominiumContactDTO } from '@dtos/condominiuns'
import { UpdateCondominiunsContactService } from '@services/condominiuns'

@Controller('/condominiuns')
export class UpdateCondominiunsContactController {
  constructor(private service: UpdateCondominiunsContactService) {}

  @Put('/:id')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdateCondominiumContactDTO,
    @Res() response: Response,
  ) {
    try {
      await this.service.execute(id, data)
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
