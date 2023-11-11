import { Module } from '@nestjs/common'

import { RolesModule } from '@modules/roles.module'
import { UsersModule } from '@modules/users.module'
import { CondominiunsModule } from '@modules/condominiuns.module'
import { AuthModule } from '@modules/auth.module'

@Module({
  imports: [RolesModule, UsersModule, CondominiunsModule, AuthModule],
  controllers: [],
})
export class AppModule {}
