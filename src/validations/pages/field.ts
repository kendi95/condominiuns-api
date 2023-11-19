import { z } from 'zod'

export const createPageSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    description: z
      .string()
      .nonempty("O campo 'descrição' não deve estar vazio."),
  })
  .required()

export const updatePageSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    description: z
      .string()
      .nonempty("O campo 'descrição' não deve estar vazio."),
  })
  .required()
