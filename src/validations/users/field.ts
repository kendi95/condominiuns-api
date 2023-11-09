import { z } from 'zod'

export const createUserSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    email: z.string().email().nonempty("O campo 'email' não deve estar vazio."),
    password: z.string().nonempty("O campo 'senha' não deve estar vazio."),
    id_role: z.string().nonempty("O campo 'role' não deve estar vazio."),
  })
  .required()

export const updateUserSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    email: z.string().email().nonempty("O campo 'email' não deve estar vazio."),
  })
  .required()

export const updateUserPasswordSchema = z
  .object({
    current_password: z
      .string()
      .nonempty("O campo 'senha atual' não deve estar vazio."),
    new_password: z
      .string()
      .nonempty("O campo 'nova senha' não deve estar vazio."),
    confirm_password: z
      .string()
      .nonempty("O campo 'confirmar senha' não deve estar vazio."),
  })
  .required()

export const updateUserRoleSchema = z
  .object({
    id_role: z.string().nonempty("O campo 'role' não deve estar vazio."),
  })
  .required()
