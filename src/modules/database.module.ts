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
import { PermissionsRepository } from '@repositories/permissions/PermissionsRepository'
import { PermissionsRepositoryPrisma } from '@repositories/permissions/prisma/PermissionsRepositoryPrisma'
import { PagesRepository } from '@repositories/pages/PagesRepository'
import { PagesRepositoryPrisma } from '@repositories/pages/prisma/PagesRepositoryPrisma'

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
      provide: PermissionsRepository,
      useClass: PermissionsRepositoryPrisma,
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
    {
      provide: PagesRepository,
      useClass: PagesRepositoryPrisma,
    },
  ],
  exports: [
    RolesRepository,
    UsersRepository,
    PermissionsRepository,
    CondominiunsRepository,
    AuthenticationRepository,
    PagesRepository,
  ],
})
export class DatabaseModule {}
