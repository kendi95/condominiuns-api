import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { RolesValidations } from '@validations/roles'

import { CreateRolesService } from '@services/roles/CreateRolesService'
import { DeleteRolesService } from '@services/roles/DeleteRolesService'
import { GetRolesService } from '@services/roles/GetRolesService'
import { ListRolesService } from '@services/roles/ListRolesService'

import { DatabaseModule } from './database.module'
import { GetRolesController } from 'src/controllers/roles/GetRolesController'
import { ListRolesController } from 'src/controllers/roles/ListRolesController'
import { DeleteRolesController } from 'src/controllers/roles/DeleteRolesController'
import { CreateRolesController } from 'src/controllers/roles/CreateRolesController'
import { UpdateRolesController } from 'src/controllers/roles/UpdateRolesController'

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
