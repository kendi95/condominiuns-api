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
