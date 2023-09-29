import { Module } from '@nestjs/common'

import { PrismaService } from '@database/prisma'

import { RolesRepository } from '@repositories/roles/RolesRepository'
import { UsersRepository } from '@repositories/users/UsersRepository'
import { RolesRepositoryPrisma } from '@repositories/roles/prisma/RolesRepositoryPrisma'
import { UsersRepositoryPrisma } from '@repositories/users/prisma/UsersRepositoryPrisma'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'
import { CondominiunsRepositoryPrisma } from '@repositories/condominiuns/prisma/CondominiunsRepositoryPrisma'

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: RolesRepository,
      useClass: RolesRepositoryPrisma,
    },
    {
      provide: UsersRepository,
      useClass: UsersRepositoryPrisma,
    },
    {
      provide: CondominiunsRepository,
      useClass: CondominiunsRepositoryPrisma,
    },
  ],
  exports: [RolesRepository, UsersRepository, CondominiunsRepository],
})
export class DatabaseModule {}
