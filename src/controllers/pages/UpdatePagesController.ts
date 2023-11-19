import { Response } from 'express'
import { Body, Controller, Param, Put, Res } from '@nestjs/common'

import { UpdatePageDTO } from '@dtos/pages'
import { AppException } from '@errors/AppException'
import { UpdatePagesService } from '@services/pages/UpdatePagesService'

@Controller('/pages')
export class UpdatePagesController {
  constructor(private service: UpdatePagesService) {}

  @Put('/:id')
  async handler(
    @Param('id') id: string,
    @Body() data: UpdatePageDTO,
    @Res() response: Response,
  ) {
    try {
      await this.service.execute(Number(id), data)
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
