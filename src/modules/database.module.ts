import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '@database/prisma'

import { RolesRepository } from '@repositories/roles/RolesRepository'
import { UsersRepository } from '@repositories/users/UsersRepository'
import { RolesRepositoryPrisma } from '@repositories/roles/prisma/RolesRepositoryPrisma'
import { UsersRepositoryPrisma } from '@repositories/users/prisma/UsersRepositoryPrisma'
import { CondominiunsRepository } from '@repositories/condominiuns/CondominiunsRepository'
import { CondominiunsRepositoryPrisma } from '@repositories/condominiuns/prisma/CondominiunsRepositoryPrisma'
import { AuthenticationRepository } from '@repositories/auth/AuthenticationRepository'
import { AuthenticationRepositoryPrisma } from '@repositories/auth/prisma/AuthenticationRepositoryPrisma'

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    JwtService,
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
    {
      provide: AuthenticationRepository,
      useClass: AuthenticationRepositoryPrisma,
    },
  ],
  exports: [
    RolesRepository,
    UsersRepository,
    CondominiunsRepository,
    AuthenticationRepository,
  ],
})
export class DatabaseModule {}
