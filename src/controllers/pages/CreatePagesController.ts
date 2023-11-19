import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common'

import { CreatePageDTO } from '@dtos/pages'
import { AppException } from '@errors/AppException'
import { CreatePagesService } from '@services/pages'

@Controller('/pages')
export class CreatePagesController {
  constructor(private service: CreatePagesService) {}

  @Post('')
  async handler(@Body() data: CreatePageDTO, @Res() response: Response) {
    try {
      const created = await this.service.execute(data)
      return response.json(created)
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
