import { z } from 'zod'

export const createRoleSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    description: z
      .string()
      .nonempty("O campo 'descrição' não deve estar vazio."),
  })
  .required()

export const updateRoleSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    description: z
      .string()
      .nonempty("O campo 'descrição' não deve estar vazio."),
  })
  .required()

export const includePermissionsRoleSchema = z
  .object({
    permissions: z
      .array(z.number())
      .nonempty("O campo 'permissões' não deve estar vazio"),
  })
  .required()
