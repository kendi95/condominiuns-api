import { Injectable } from '@nestjs/common'

import { Pages } from '@domains/Pages'
import { PrismaService } from '@database/prisma'
import { AppException } from '@errors/AppException'
import { CreatePageDTO, UpdatePageDTO } from '@dtos/pages'
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from '@database/prisma/paginator'
import { PagesRepository } from '@repositories/pages/PagesRepository'

@Injectable()
export class PagesRepositoryPrisma implements PagesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePageDTO): Promise<Pages> {
    const pageExists = await this.prisma.pages.findFirst({
      where: {
        name: data.name,
      },
    })

    if (pageExists) throw new AppException('Página já existe.', 400)

    const createdPage = await this.prisma.pages.create({
      data: { ...data },
    })

    return createdPage
  }

  async list(query: PaginateOptions): Promise<PaginatedResult<Pages>> {
    return paginator({
      model: this.prisma.pages,
      options: {
        ...query,
      },
    })
  }

  async get(id: number): Promise<Pages> {
    const page = await this.prisma.pages.findUnique({
      where: { id },
    })

    if (!page) throw new AppException('Página não encontrado.', 404)

    return page
  }

  async update(id: number, data: UpdatePageDTO): Promise<void> {
    const page = await this.prisma.pages.findUnique({
      where: { id },
    })

    if (!page) throw new AppException('Página não encontrado.', 404)

    await this.prisma.pages.update({
      where: { id },
      data: { ...data },
    })
  }

  async delete(id: number): Promise<void> {
    const page = await this.prisma.pages.findUnique({
      where: { id },
    })

    if (!page) throw new AppException('Página não encontrado.', 404)

    await this.prisma.pages.delete({
      where: { id },
    })
  }
}
