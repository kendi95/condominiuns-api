import { Injectable } from '@nestjs/common'

import { AuthenticationRepository } from '@repositories/auth/AuthenticationRepository'
import { AuthenticateDTO, TokenDTO } from '@dtos/auth'

@Injectable()
export class AuthenticationService {
  constructor(private authRepository: AuthenticationRepository) {}

  async execute(data: AuthenticateDTO): Promise<TokenDTO> {
    const auth = await this.authRepository.authenticate(data)
    return auth
  }
}
