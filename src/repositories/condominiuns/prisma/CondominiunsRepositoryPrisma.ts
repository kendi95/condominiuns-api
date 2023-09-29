import { Injectable } from '@nestjs/common'
import { PrismaService } from '@database/prisma'
import { AppException } from '@errors/AppException'
import { Condominiuns } from '@domains/Condominiuns'
import {
  CreateCondominiumDTO,
  UpdateCondominiumAddressDTO,
  UpdateCondominiumDTO,
} from '@dtos/condominiuns'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@database/prisma/paginator'

@Injectable()
export class CondominiunsRepositoryPrisma implements CondominiunsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCondominiumDTO): Promise<Condominiuns> {
    const documentExists = await this.prisma.condominiuns.findUnique({
      where: {
        document: data.document,
      },
    })

    if (documentExists) throw new AppException('Documento já existe.', 400)

    const nameExists = await this.prisma.condominiuns.findUnique({
      where: { name: data.name },
    })

    if (nameExists) throw new AppException('Nome do condomínio já existe.', 400)

    const created = await this.prisma.condominiuns.create({
      data: { ...data },
    })

    return created
  }

  async list(
    query: PaginateOptions,
  ): Promise<PaginatedResult<Omit<Condominiuns, 'address'>>> {
    return paginator({
      model: this.prisma.condominiuns,
      args: {
        select: {
          id: true,
          name: true,
          document: true,
          status: true,
        },
      },
      options: {
        ...query,
      },
    })
  }

  async get(id: string): Promise<Condominiuns> {
    const condominium = await this.prisma.condominiuns.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        document: true,
        status: true,
        address: true,
      },
    })

    if (!condominium) throw new AppException('Condomínio não encontrado.', 404)

    return condominium
  }

  async update(id: string, data: UpdateCondominiumDTO): Promise<void> {
    const condominium = await this.prisma.condominiuns.findUnique({
      where: { id },
      select: {
        id: true,
      },
    })

    if (!condominium) throw new AppException('Condomínio não encontrado.', 404)

    await this.prisma.condominiuns.update({
      where: { id },
      data: { ...data },
    })
  }

  async updateStatus(id: string): Promise<void> {
    const condominium = await this.prisma.condominiuns.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
      },
    })

    if (!condominium) throw new AppException('Condomínio não encontrado.', 404)

    await this.prisma.condominiuns.update({
      where: { id },
      data: {
        status: !condominium.status,
      },
    })
  }

  async updateAddress(
    id: string,
    data: UpdateCondominiumAddressDTO,
  ): Promise<void> {
    const condominium = await this.prisma.condominiuns.findUnique({
      where: { id },
      select: {
        id: true,
      },
    })

    if (!condominium) throw new AppException('Condomínio não encontrado.', 404)

    const condominiumAddress = await this.prisma.addresses.findUnique({
      where: { id_condominium: id },
    })

    if (!condominiumAddress) {
      await this.prisma.addresses.create({
        data: {
          ...data,
          id_condominium: id,
        },
      })
    } else {
      await this.prisma.addresses.update({
        where: {
          id_condominium: id,
        },
        data: { ...data },
      })
    }
  }

  async delete(id: string): Promise<void> {
    const condominium = await this.prisma.condominiuns.findUnique({
      where: { id },
      select: {
        id: true,
        address: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!condominium) throw new AppException('Condomínio não encontrado.', 404)

    await this.prisma.addresses.delete({
      where: { id: condominium.address.id },
    })

    await this.prisma.condominiuns.delete({
      where: {
        id,
      },
    })
  }
}
