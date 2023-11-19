export type CreateRoleDTO = {
  name: string
  description: string
}

export type UpdateRoleDTO = {
  name: string
  description: string
}

export type IncludePermissionsDTO = {
  permissions: number[]
}

export type IncludePagesDTO = {
  pages: number[]
}
