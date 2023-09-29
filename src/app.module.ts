import { Module } from '@nestjs/common'

import { RolesModule } from '@modules/roles.module'
import { UsersModule } from '@modules/users.module'
import { CondominiunsModule } from '@modules/condominiuns.module'

@Module({
  imports: [RolesModule, UsersModule, CondominiunsModule],
  controllers: [],
})
export class AppModule {}
