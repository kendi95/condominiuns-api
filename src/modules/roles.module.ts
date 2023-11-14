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
  IncludePermissionsRolesController,
} from '@controllers/roles'

import {
  CreateRolesService,
  ListRolesService,
  GetRolesService,
  DeleteRolesService,
  IncludePermissionsRolesService,
} from '@services/roles'
import { IncludePermissionsRolesValidations } from '@validations/roles/permissions.validation'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateRolesController,
    GetRolesController,
    ListRolesController,
    DeleteRolesController,
    UpdateRolesController,
    IncludePermissionsRolesController,
  ],
  providers: [
    CreateRolesService,
    ListRolesService,
    GetRolesService,
    DeleteRolesService,
    IncludePermissionsRolesService,
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

    consumer.apply(IncludePermissionsRolesValidations).forRoutes({
      path: 'roles/:id/permissions',
      method: RequestMethod.PUT,
    })
  }
}
