import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { DatabaseModule } from './database.module'

import { PermissionsValidations } from '@validations/permissions'

import {
  CreatePermissionsService,
  DeletePermissionsService,
  GetPermissionsService,
  ListPermissionsService,
  UpdatePermissionsService,
} from '@services/permissions'

import {
  CreatePermissionsController,
  DeletePermissionsController,
  GetPermissionsController,
  ListPermissionsController,
  UpdatePermissionsController,
} from '@controllers/permissions'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatePermissionsController,
    DeletePermissionsController,
    GetPermissionsController,
    ListPermissionsController,
    UpdatePermissionsController,
  ],
  providers: [
    CreatePermissionsService,
    DeletePermissionsService,
    GetPermissionsService,
    ListPermissionsService,
    UpdatePermissionsService,
  ],
})
export class PermissionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PermissionsValidations).forRoutes({
      path: 'permissions',
      method: RequestMethod.POST,
    })

    consumer.apply(PermissionsValidations).forRoutes({
      path: 'permissions/:id',
      method: RequestMethod.PUT,
    })
  }
}
