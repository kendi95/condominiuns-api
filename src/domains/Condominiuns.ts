import { Addresses } from './Addresses'
import { Contacts } from './Contacts'

export class Condominiuns {
  id: string
  name: string
  description: string
  document: string
  status: boolean

  address?: Addresses
  contact?: Contacts
}
