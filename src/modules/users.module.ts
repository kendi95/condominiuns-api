import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { CreateUsersService } from '@services/users/CreateUsersService'
import { DeleteUsersService } from '@services/users/DeleteUsersService'
import { GetUsersService } from '@services/users/GetUsersService'
import { ListUsersService } from '@services/users/ListUsersService'
import { UpdateUsersPasswordService } from '@services/users/UpdateUsersPasswordService'
import { UpdateUsersRoleService } from '@services/users/UpdateUsersRoleService'
import { UpdateUsersService } from '@services/users/UpdateUsersService'
import { UpdateUsersStatusService } from '@services/users/UpdateUsersStatusService'

import { DatabaseModule } from './database.module'
import { UsersValidations } from '@validations/users'
import { UsersPasswordValidations } from '@validations/users/password.validation'
import { UsersRolesValidations } from '@validations/users/roles.validation'

import { CreateUsersController } from '@controllers/users/CreateUsersController'
import { GetUsersController } from '@controllers/users/GetUsersController'
import { ListUsersController } from '@controllers/users/ListUsersController'
import { DeleteUsersController } from '@controllers/users/DeleteUsersController'
import { UpdateUsersController } from '@controllers/users/UpdateUsersController'
import { UpdateUsersPasswordController } from '@controllers/users/UpdateUsersPasswordController'
import { UpdateUsersRoleController } from '@controllers/users/UpdateUsersRoleController'
import { UpdateUsersStatusController } from '@controllers/users/UpdateUsersStatusController'

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
