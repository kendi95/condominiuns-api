import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common'

import { AuthenticateDTO } from '@dtos/auth'
import { AppException } from '@errors/AppException'
import { AuthenticationService } from '@services/auth/AuthenticationService'

@Controller('/auth')
export class AuthenticationController {
  constructor(private service: AuthenticationService) {}

  @Post('')
  async handler(@Body() data: AuthenticateDTO, @Res() response: Response) {
    try {
      const auth = await this.service.execute(data)
      return response.status(200).json(auth)
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
