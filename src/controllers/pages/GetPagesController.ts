import { Response } from 'express'
import { Controller, Get, Param, Res } from '@nestjs/common'

import { AppException } from '@errors/AppException'
import { GetPagesService } from '@services/pages'

@Controller('/pages')
export class GetPagesController {
  constructor(private service: GetPagesService) {}

  @Get('/:id')
  async handler(@Param('id') id: string, @Res() response: Response) {
    try {
      const page = await this.service.execute(Number(id))
      return response.json(page)
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
