export type CreateUserDTO = {
  name: string
  email: string
  password: string
  id_role: number
}

export type UpdateUserDTO = {
  name: string
  email: string
}

export type UpdateUserPasswordDTO = {
  current_password: string
  new_password: string
  confirm_password: string
}

export type UpdateUserRoleDTO = {
  id_role: number
}
