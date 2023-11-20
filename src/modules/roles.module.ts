import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { RolesValidations } from '@validations/roles'
import { IncludePermissionsRolesValidations } from '@validations/roles/permissions.validation'
import { IncludePagesRolesValidations } from '@validations/roles/pages.validation'

import { DatabaseModule } from './database.module'

import {
  CreateRolesController,
  GetRolesController,
  ListRolesController,
  DeleteRolesController,
  UpdateRolesController,
  IncludePermissionsRolesController,
  IncludePagesRolesController,
} from '@controllers/roles'

import {
  CreateRolesService,
  ListRolesService,
  GetRolesService,
  DeleteRolesService,
  UpdateRolesService,
  IncludePermissionsRolesService,
  IncludePagesRolesService,
} from '@services/roles'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateRolesController,
    GetRolesController,
    ListRolesController,
    DeleteRolesController,
    UpdateRolesController,
    IncludePermissionsRolesController,
    IncludePagesRolesController,
  ],
  providers: [
    CreateRolesService,
    ListRolesService,
    GetRolesService,
    DeleteRolesService,
    UpdateRolesService,
    IncludePermissionsRolesService,
    IncludePagesRolesService,
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

    consumer.apply(IncludePagesRolesValidations).forRoutes({
      path: 'roles/:id/pages',
      method: RequestMethod.PUT,
    })
  }
}
