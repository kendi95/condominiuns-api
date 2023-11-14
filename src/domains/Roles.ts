import { Permissions } from './Permissions'

export interface Roles {
  id: number
  name: string
  description: string

  permissions?: Permissions[]
}
