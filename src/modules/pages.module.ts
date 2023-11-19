import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { PagesValidations } from '@validations/pages'

import { DatabaseModule } from './database.module'

import {
  CreatePagesController,
  GetPagesController,
  ListPagesController,
  DeletePagesController,
  UpdatePagesController,
} from '@controllers/pages'

import {
  CreatePagesService,
  ListPagesService,
  GetPagesService,
  DeletePagesService,
  UpdatePagesService,
} from '@services/pages'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatePagesController,
    GetPagesController,
    ListPagesController,
    DeletePagesController,
    UpdatePagesController,
  ],
  providers: [
    CreatePagesService,
    ListPagesService,
    GetPagesService,
    DeletePagesService,
    UpdatePagesService,
  ],
})
export class PagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagesValidations).forRoutes({
      path: 'pages',
      method: RequestMethod.POST,
    })

    consumer.apply(PagesValidations).forRoutes({
      path: 'pages/:id',
      method: RequestMethod.PUT,
    })
  }
}
