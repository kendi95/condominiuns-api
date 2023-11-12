import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { DatabaseModule } from './database.module'
import { UsersValidations } from '@validations/users'
import { UsersPasswordValidations } from '@validations/users/password.validation'
import { UsersRolesValidations } from '@validations/users/roles.validation'

import {
  CreateUsersController,
  GetUsersController,
  ListUsersController,
  DeleteUsersController,
  UpdateUsersController,
  UpdateUsersPasswordController,
  UpdateUsersRoleController,
  UpdateUsersStatusController,
} from '@controllers/users'
import {
  CreateUsersService,
  ListUsersService,
  DeleteUsersService,
  GetUsersService,
  UpdateUsersService,
  UpdateUsersPasswordService,
  UpdateUsersRoleService,
  UpdateUsersStatusService,
} from '@services/users'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUsersController,
    GetUsersController,
    ListUsersController,
    DeleteUsersController,
    UpdateUsersController,
    UpdateUsersPasswordController,
    UpdateUsersRoleController,
    UpdateUsersStatusController,
  ],
  providers: [
    CreateUsersService,
    ListUsersService,
    DeleteUsersService,
    GetUsersService,
    UpdateUsersService,
    UpdateUsersPasswordService,
    UpdateUsersRoleService,
    UpdateUsersStatusService,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersValidations).forRoutes({
      path: 'users',
      method: RequestMethod.POST,
    })

    consumer.apply(UsersValidations).forRoutes({
      path: 'users/:id',
      method: RequestMethod.PUT,
    })

    consumer.apply(UsersPasswordValidations).forRoutes({
      path: 'users/:id/password',
      method: RequestMethod.PUT,
    })

    consumer.apply(UsersRolesValidations).forRoutes({
      path: 'users/:id/roles',
      method: RequestMethod.PATCH,
    })
  }
}
