import { Users } from '@domains/Users'

export type AuthenticateDTO = {
  email: string
  password: string
}

export type TokenDTO = {
  token: string
  user: Partial<Users>
}
