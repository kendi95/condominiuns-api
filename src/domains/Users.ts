import { Roles } from './Roles'

export class Users {
  id: string
  name: string
  email: string
  password: string
  id_role: string
  status: boolean

  role?: Roles
}
