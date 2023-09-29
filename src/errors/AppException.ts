import { HttpException } from '@nestjs/common'

export class AppException extends HttpException {
  message: string
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message, statusCode)

    this.message = message
    this.statusCode = statusCode
  }

  toJson() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}
