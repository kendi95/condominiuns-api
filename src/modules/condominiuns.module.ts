import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { DatabaseModule } from './database.module'
import { CondominiunsValidations } from '@validations/condominiuns'
import { CondominiunAddressValidations } from '@validations/condominiuns/address.validation'

import { GetCondominiunsService } from '@services/condominiuns/GetCondominiunsService'
import { ListCondominiunsService } from '@services/condominiuns/ListCondominiunsService'
import { CreateCondominiunsService } from '@services/condominiuns/CreateCondominiunsService'
import { UpdateCondominiunsService } from '@services/condominiuns/UpdateCondominiunsService'
import { UpdateCondominiunsStatusService } from '@services/condominiuns/UpdateCondominiunsStatusService'
import { UpdateCondominiunsAddressService } from '@services/condominiuns/UpdateCondominiunsAddressService'
import { DeleteCondominiunsService } from '@services/condominiuns/DeleteCondominiunsService'
import { ListCondominiunsController } from '@controllers/condominiuns/ListCondominiunsController'
import { CreateCondominiunsController } from '@controllers/condominiuns/CreateCondominiunsController'
import { GetCondominiunsController } from '@controllers/condominiuns/GetCondominiunsController'
import { UpdateCondominiunsController } from '@controllers/condominiuns/UpdateCondominiunsController'
import { UpdateCondominiunsStatusController } from '@controllers/condominiuns/UpdateCondominiunsStatusController'
import { UpdateCondominiunsAddressController } from '@controllers/condominiuns/UpdateCondominiunsAddressController'
import { DeleteCondominiunsController } from '@controllers/condominiuns/DeleteCondominiunsController'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ListCondominiunsController,
    CreateCondominiunsController,
    GetCondominiunsController,
    UpdateCondominiunsController,
    UpdateCondominiunsStatusController,
    UpdateCondominiunsAddressController,
    DeleteCondominiunsController,
  ],
  providers: [
    ListCondominiunsService,
    CreateCondominiunsService,
    GetCondominiunsService,
    UpdateCondominiunsService,
    UpdateCondominiunsStatusService,
    UpdateCondominiunsAddressService,
    DeleteCondominiunsService,
  ],
})
export class CondominiunsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CondominiunsValidations).forRoutes({
      path: 'condominiuns',
      method: RequestMethod.POST,
    })
    consumer.apply(CondominiunsValidations).forRoutes({
      path: 'condominiuns/:id',
      method: RequestMethod.PUT,
    })
    consumer.apply(CondominiunAddressValidations).forRoutes({
      path: 'condominiuns/:id/address',
      method: RequestMethod.PUT,
    })
  }
}
