import { Roles } from './Roles'

export class Users {
  id: string
  name: string
  email: string
  password: string
  id_role: number
  status: boolean

  role?: Roles
}
