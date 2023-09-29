import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import {
  createCondominiumSchema,
  updateCondominiumSchema,
} from '@validations/condominiuns/field'
import { AppException } from '@errors/AppException'

@Injectable()
export class CondominiunsValidations implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'POST') {
        await createCondominiumSchema.parseAsync(req.body)
      }

      if (req.method === 'PUT') {
        await updateCondominiumSchema.parseAsync(req.body)
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
