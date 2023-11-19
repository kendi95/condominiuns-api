import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { createPageSchema, updatePageSchema } from '@validations/pages/field'
import { AppException } from '@errors/AppException'

@Injectable()
export class PagesValidations implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'POST') {
        await createPageSchema.parseAsync(req.body)
      }

      if (req.method === 'PUT') {
        await updatePageSchema.parseAsync(req.body)
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
