import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { DatabaseModule } from './database.module'

import { AuthenticationService } from '@services/auth/AuthenticationService'

import { AuthenticationController } from '@controllers/auth/AuthenticationController'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.APP_AUTH_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthModule {}
