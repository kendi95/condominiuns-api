import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { RolesValidations } from '@validations/roles'

import { DatabaseModule } from './database.module'

import {
  CreateRolesController,
  GetRolesController,
  ListRolesController,
  DeleteRolesController,
  UpdateRolesController,
} from '@controllers/roles'

import {
  CreateRolesService,
  ListRolesService,
  GetRolesService,
  DeleteRolesService,
} from '@services/roles'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateRolesController,
    GetRolesController,
    ListRolesController,
    DeleteRolesController,
    UpdateRolesController,
  ],
  providers: [
    CreateRolesService,
    ListRolesService,
    GetRolesService,
    DeleteRolesService,
  ],
})
export class RolesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RolesValidations).forRoutes({
      path: 'roles',
      method: RequestMethod.POST,
    })

    consumer.apply(RolesValidations).forRoutes({
      path: 'roles/:id',
      method: RequestMethod.PUT,
    })
  }
}
