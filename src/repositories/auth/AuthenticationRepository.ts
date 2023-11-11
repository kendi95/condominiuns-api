import { AuthenticateDTO, TokenDTO } from '@dtos/auth'

export abstract class AuthenticationRepository {
  abstract authenticate(data: AuthenticateDTO): Promise<TokenDTO>
}
