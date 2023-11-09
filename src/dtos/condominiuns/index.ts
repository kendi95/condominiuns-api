export type CreateCondominiumDTO = {
  name: string
  description: string
  document: string
  contact: {
    email: string
    phone: string
    cell_phone: string
  }
}

export type UpdateCondominiumDTO = {
  name: string
  description: string
}

export type UpdateCondominiumContactDTO = {
  email: string
  phone: string
  cell_phone: string
}

export type UpdateCondominiumAddressDTO = {
  address: string
  street_number: number
  zip_code: string
  complement?: string
  neighborhood: string
  city: string
  province: string
}
