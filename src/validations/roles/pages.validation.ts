import { NextFunction, Request, Response } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ZodError } from 'zod'

import { AppException } from '@errors/AppException'

import { includePagesRoleSchema } from './field'

@Injectable()
export class IncludePagesRolesValidations implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'PUT') {
        await includePagesRoleSchema.parseAsync(req.body)
      }

      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => err.message).join(', ')

        return res.status(404).json(new AppException(errors, 404).toJson())
      }
    }
  }
}
