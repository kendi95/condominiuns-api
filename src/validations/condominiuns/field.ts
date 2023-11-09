import { z } from 'zod'

export const createCondominiumSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    description: z
      .string()
      .nonempty("O campo 'descrição' não deve estar vazio."),
    document: z.string().nonempty("O campo 'documento' não deve estar vazio."),
    contact: z.object({
      email: z
        .string()
        .email()
        .nonempty("O campo 'email' não deve estar vazio."),
      phone: z.string().nonempty("O campo 'telefone' não deve estar vazio."),
      cell_phone: z
        .string()
        .nonempty("O campo 'celular' não deve estar vazio."),
    }),
  })
  .required()

export const updateCondominiumSchema = z
  .object({
    name: z.string().nonempty("O campo 'nome' não deve estar vazio."),
    description: z
      .string()
      .nonempty("O campo 'descrição' não deve estar vazio."),
  })
  .required()

export const updateCondomiumContactSchema = z.object({
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  cell_phone: z.string().nullable(),
})

export const updateCondominiumAddressSchema = z
  .object({
    address: z
      .string({
        required_error: "'endereço' obrigatório!",
        invalid_type_error: "'endereço' ser do tipo caracter",
      })
      .nonempty("O campo 'endereço' não deve estar vazio."),
    street_number: z
      .number({
        required_error: "'número do endereço' obrigatório!",
        invalid_type_error: "'número do endereço' ser do tipo caracter",
      })
      .nonnegative("O 'número do endereço' não pode estar negativo."),
    zip_code: z
      .string({
        required_error: "'cep' obrigatório!",
        invalid_type_error: "'cep' ser do tipo caracter",
      })
      .min(9, "O campo 'cep' deve ter no mínimo 9 caracteres, contendo o '-'.")
      .max(9, "O campo 'cep' deve ter no máximo 9 caracteres, contendo o '-'.")
      .nonempty("O campo 'cep' não deve estar vazio."),
    complement: z.string().nullable(),
    neighborhood: z
      .string({
        required_error: "'bairro' obrigatório!",
        invalid_type_error: "'bairro' ser do tipo caracter",
      })
      .nonempty("O campo 'bairro' não deve estar vazio."),
    city: z
      .string({
        required_error: "'cidade' obrigatório!",
        invalid_type_error: "'cidade' ser do tipo caracter",
      })
      .nonempty("O campo 'cidade' não deve estar vazio."),
    province: z
      .string({
        required_error: "'estado/província' obrigatório!",
        invalid_type_error: "'estado/província' ser do tipo caracter",
      })
      .nonempty("O campo 'estado/província' não deve estar vazio."),
  })
  .required()
