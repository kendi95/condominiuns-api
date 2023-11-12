import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { DatabaseModule } from './database.module'
import { CondominiunsValidations } from '@validations/condominiuns'
import { CondominiunAddressValidations } from '@validations/condominiuns/address.validation'
import { CondominiunContactValidations } from '@validations/condominiuns/contact.validation'

import {
  ListCondominiunsController,
  CreateCondominiunsController,
  GetCondominiunsController,
  UpdateCondominiunsController,
  UpdateCondominiunsStatusController,
  UpdateCondominiunsAddressController,
  DeleteCondominiunsController,
  UpdateCondominiunsContactController,
} from '@controllers/condominiuns'

import {
  ListCondominiunsService,
  CreateCondominiunsService,
  GetCondominiunsService,
  UpdateCondominiunsService,
  UpdateCondominiunsStatusService,
  UpdateCondominiunsAddressService,
  DeleteCondominiunsService,
  UpdateCondominiunsContactService,
} from '@services/condominiuns'

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
    UpdateCondominiunsContactController,
  ],
  providers: [
    ListCondominiunsService,
    CreateCondominiunsService,
    GetCondominiunsService,
    UpdateCondominiunsService,
    UpdateCondominiunsStatusService,
    UpdateCondominiunsAddressService,
    DeleteCondominiunsService,
    UpdateCondominiunsContactService,
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
    consumer.apply(CondominiunContactValidations).forRoutes({
      path: 'condominiuns/:id/contact',
      method: RequestMethod.PUT,
    })
  }
}
