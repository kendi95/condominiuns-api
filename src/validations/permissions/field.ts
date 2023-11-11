import { z } from 'zod'

export const createPermissionSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
  })
  .required()

export const updatePermissionSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
  })
  .required()
